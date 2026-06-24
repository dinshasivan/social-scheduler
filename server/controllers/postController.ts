import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware.js";
import { GoogleGenAI } from "@google/genai";
import axios from "axios";
import { Generation } from "../models/Generation.js";
import { Post } from "../models/Post.js";
import { uploadBufferToCloudinary } from "../utils/cloudinaryUpload.js";

// Generate post
// POST /api/posts/generate
export const generatePost = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { prompt, tone, generateImage } = req.body;

        // NOTE: adjust this if your authMiddleware attaches the user differently (e.g. req.user._id)
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            res.status(400).json({ message: "Gemini API key is missing. Please add it to your server/.env file." });
            return;
        }

        const ai = new GoogleGenAI({ apiKey });

        // Generate text
        const textResponse = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: `Generate a social media post based on this prompt: "${prompt}".
            Tone: ${tone}.
            Include relevant hashtags.
            Format the response as JSON with "content" and "imagePrompt" fields.
            The "imagePrompt" should be a highly descriptive prompt for an image generator that
            complements the post.`,
        });

        let content = "";
        let imagePrompt = prompt;

        try {
            const rawText = textResponse.text || "";
            const jsonMatch = rawText.match(/\{[\s\S]*\}/);
            const data = jsonMatch ? JSON.parse(jsonMatch[0]) : { content: rawText, imagePrompt: prompt };
            content = data.content;
            imagePrompt = data.imagePrompt;
        } catch (e) {
            content = textResponse.text || "";
        }

        let mediaUrl = "";
        let mediaType: "image" | undefined;
        let cloudinaryPublicId = "";

        if (generateImage) {
            try {
                const encodedPrompt = encodeURIComponent(imagePrompt);
                const pollinationsUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&nologo=true&model=flux`;

                const poliResponse = await axios.get(pollinationsUrl, { responseType: "arraybuffer" });

                if (poliResponse.status === 200) {
                    // Pollinations URLs aren't guaranteed to stay cached/valid forever,
                    // so we pull the bytes down and persist them in our own Cloudinary account.
                    const buffer = Buffer.from(poliResponse.data);
                    const uploaded = await uploadBufferToCloudinary(buffer, "generations");
                    mediaUrl = uploaded.url;
                    cloudinaryPublicId = uploaded.publicId;
                    mediaType = "image";
                }
            } catch (error: any) {
                console.warn("Image generation/upload failed:", error?.message);
            }
        }

        const savedGeneration = await Generation.create({
            user: userId,
            prompt,
            content,
            mediaUrl,
            mediaType,
            tone,
            cloudinaryPublicId,
        });

        res.status(201).json(savedGeneration);
    } catch (error: any) {
        res.status(500).json({ message: error?.message || "Server error" });
    }
};

// Get generations
// Get /api/posts/generations
export const getGenerations = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const generations = await Generation.find({ user: userId }).sort({ createdAt: -1 });
        res.status(200).json(generations);
    } catch (error: any) {
        res.status(500).json({ message: error?.message || "Server error" });
    }
};

// Get posts
// GET /api/posts
export const getPosts = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const posts = await Post.find({ user: userId }).sort({ schedulerFor: 1 });
        res.status(200).json(posts);
    } catch (error: any) {
        res.status(500).json({ message: error?.message || "Server error" });
    }
};

// Schedule post
// POST /api/posts
export const schedulePost = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
 
        const { generationId, content: rawContent, platforms: rawPlatforms, schedulerFor: schedulerForBody, scheduledFor } = req.body;
 
        // FormData (multipart, used when a file is attached) can't carry real arrays,
        // so the client sends platforms as a JSON string in that case — handle both.
        let platforms: string[];
        try {
            platforms = typeof rawPlatforms === "string" ? JSON.parse(rawPlatforms) : rawPlatforms;
        } catch {
            res.status(400).json({ message: "platforms must be a JSON array of platform strings" });
            return;
        }
 
        const scheduleDateRaw = schedulerForBody || scheduledFor;
 
        if (!Array.isArray(platforms) || platforms.length === 0 || !scheduleDateRaw) {
            res.status(400).json({ message: "platforms (non-empty array) and a schedule date/time are required" });
            return;
        }
 
        const parsedDate = new Date(scheduleDateRaw);
        if (isNaN(parsedDate.getTime())) {
            res.status(400).json({ message: "Could not parse the scheduled date/time" });
            return;
        }
 
        let content = rawContent;
        let mediaUrl: string | undefined;
        let mediaType: "image" | "video" | undefined;
        let generationRef: any;
 
        if (generationId) {
            // Flow 1: scheduling an existing AI-generated draft.
            const generation = await Generation.findOne({ _id: generationId, user: userId });
            if (!generation) {
                res.status(404).json({ message: "Generation not found, or it doesn't belong to you" });
                return;
            }
            content = generation.content;
            mediaUrl = generation.mediaUrl;
            mediaType = generation.mediaType as "image" | "video" | undefined;
            generationRef = generation._id;
        } else {
            // Flow 2: manual compose — content typed directly, optional file upload.
            if (!content) {
                res.status(400).json({ message: "content is required when not scheduling from a generation" });
                return;
            }
 
            if (req.file) {
                const isVideo = req.file.mimetype.startsWith("video/");
                const uploaded = await uploadBufferToCloudinary(
                    req.file.buffer,
                    "scheduled-posts",
                    isVideo ? "video" : "image"
                );
                mediaUrl = uploaded.url;
                mediaType = isVideo ? "video" : "image";
            }
        }
 
        const post = await Post.create({
            user: userId,
            content,
            mediaUrl,
            mediaType,
            platforms,
            generation: generationRef,
            schedulerFor: parsedDate,
            status: "scheduled",
        });
 
        res.status(201).json(post);
    } catch (error: any) {
        res.status(500).json({ message: error?.message || "Server error" });
    }
};
 