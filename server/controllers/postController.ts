import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware.js";
import { GoogleGenAI } from "@google/genai";
import axios from "axios";




// Generate post
// POST /api/posts/generate
export const generatePost = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { prompt, tone, generateImage } = req.body;

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {  
            res.status(400).json({ message: "Gemini API key is missing. Please add it to your server/.env file." });
            return;
        }

        const ai = new GoogleGenAI({ apiKey });

        // Generate text
        const textResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash",
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
        if (generateImage) {
            try {

                const encodedPrompt = encodeURIComponent(imagePrompt);
                const pollinationsUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&nologo=true&model=flux`;

                const poliResponse = await axios.get(pollinationsUrl, { responseType: "arraybuffer" });

                if (poliResponse.status === 200) {
                    mediaUrl = pollinationsUrl;
                }
            } catch (error: any) {

                console.warn("Pollinations image generation failed:", error?.message);
            }
        }

        res.status(201).json({ content, mediaUrl });
    } catch (error: any) {
        res.status(500).json({ message: error?.message || "Server error" });
    }
}

// Get generations
// POST /api/posts/generations
export const getGenerations = async (req: AuthRequest, res: Response): Promise<void> => {

}

// Get posts
// GET /api/posts
export const getPosts = async (req: AuthRequest, res: Response): Promise<void> => {

}

// Schedule post
// POST /api/posts
export const schedulePost = async (req: AuthRequest, res: Response): Promise<void> => {

}