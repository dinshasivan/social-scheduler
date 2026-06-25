import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        description: { type: String, required: true },
        date: { type: String },
    },
    { timestamps: true } // gives you createdAt automatically
);

export const Activity = mongoose.model("Activity", activitySchema);