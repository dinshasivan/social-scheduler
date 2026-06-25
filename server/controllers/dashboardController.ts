import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware.js";
import { Post } from "../models/Post.js";
import { Account } from "../models/Account.js";
import { Activity } from "../models/Activity.js";

// GET /api/dashboard
export const getDashboardData = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user;

        const [scheduledCount, publishedCount, connectedAccountsCount, activities] = await Promise.all([
            Post.countDocuments({ user: userId, status: "scheduled" }),
            Post.countDocuments({ user: userId, status: "published" }),
            Account.countDocuments({ user: userId, status: "connected" }),
            Activity.find({ user: userId })
                .sort({ createdAt: -1 })
                .limit(10),
        ]);

        res.status(200).json({
            stats: {
                scheduled: scheduledCount,
                published: publishedCount,
                connectedAccounts: connectedAccountsCount,
            },
            activities,
        });
    } catch (error: any) {
        res.status(500).json({ message: error?.message || "Failed to load dashboard data" });
    }
};