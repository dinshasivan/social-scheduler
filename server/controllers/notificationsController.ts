import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware.js";
import { Activity } from "../models/Activity.js";

// GET /api/notifications
export const getNotifications = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const notifications = await Activity.find({
            user: req.user._id,
            type: { $in: ["post_published", "post_failed"] },
        })
            .sort({ createdAt: -1 })
            .limit(20);

        const unreadCount = await Activity.countDocuments({
            user: req.user._id,
            type: { $in: ["post_published", "post_failed"] },
            read: false,
        });

        res.json({ notifications, unreadCount });
    } catch (error: any) {
        res.status(500).json({ message: error?.message || "Server error" });
    }
};

// PATCH /api/notifications/read-all
export const markAllNotificationsRead = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        await Activity.updateMany(
            { user: req.user._id, type: { $in: ["post_published", "post_failed"] }, read: false },
            { $set: { read: true } }
        );
        res.json({ message: "All notifications marked as read" });
    } catch (error: any) {
        res.status(500).json({ message: error?.message || "Server error" });
    }
};