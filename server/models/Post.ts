import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    mediaUrl: { type: String },
    mediaType: { type: String, enum: ["image", "video"] },
    // Changed from a single `platform` string to an array so one post can target
    // multiple platforms at once (e.g. ["twitter", "linkedin"]).
    platforms: {
        type: [String],
        enum: ["twitter", "linkedin", "facebook", "instagram", "facebook_page", "linkedin_page", "instagram_business"],
        required: true,
        validate: {
            validator: (arr: string[]) => Array.isArray(arr) && arr.length > 0,
            message: "At least one platform is required",
        },
    },
    // Optional pointer back to the Generation this post was scheduled from.
    generation: { type: mongoose.Schema.Types.ObjectId, ref: "Generation" },
    schedulerFor: { type: Date, required: true },
    status: { type: String, enum: ["draft", "scheduled", "published", "failed"], default: "scheduled" },
}, { timestamps: true })

export const Post = mongoose.model("Post", postSchema)