import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        description: { type: String, required: true },
        type: {
            type: String,
            enum: ["post_published", "post_failed", "account_connected", "account_disconnected"],
            default: "post_published",
        },
        read: { type: Boolean, default: false },
        date: { type: String },
    },
    { timestamps: true }
);

export const Activity = mongoose.model("Activity", activitySchema);