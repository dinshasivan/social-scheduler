import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware.js";
import { Account } from "../models/Account.js";
import { Activity } from "../models/Activity.js";
import zernio from "../config/zernio.js";

// Get all accounts
// GET /api/accounts
export const getAccounts = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        console.log("getAccounts userId:", req.user._id);
        const accounts = await Account.find({ user: req.user._id });
        console.log("getAccounts found:", accounts.length);
        res.json(accounts);
    } catch (error: any) {
        res.status(500).json({ message: error?.message || "Server error" });
    }
}

// Add account
// POST /api/accounts
export const addAccounts = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { platform, handle, avatarUrl } = req.body;
        const account = await Account.create({ user: req.user._id, platform, handle, avatarUrl });

        await Activity.create({
            user: req.user._id,
            type: "account_connected",
            description: `Connected ${platform} account${handle ? ` (${handle})` : ""}`,
        });

        res.status(201).json(account)
    } catch (error: any) {
        res.status(500).json({ message: error?.message || "Server error" });
    }
}

// Disconnect account
// DELETE /api/accounts/:id
export const disconnectAccounts = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const account = await Account.findOne({ _id: req.params.id, user: req.user._id })
        if (!account) {
            res.status(404).json({ message: "Account not found" });
            return;
        }

        if (account.zernioAccountId) {
            try {
                await zernio.accounts.deleteAccount({
                    path: {
                        accountId: account.zernioAccountId,
                    }
                })
            } catch (error: any) {
                res.status(500).json({ message: error?.response?.data?.message || error?.message });
                return;
            }
        }

        const { platform, handle } = account;
        await account.deleteOne()

        await Activity.create({
            user: req.user._id,
            type: "account_disconnected",
            description: `Disconnected ${platform} account${handle ? ` (${handle})` : ""}`,
        });

        res.json({ message: "Account disconnected successfully" })
    } catch (error: any) {
        res.status(500).json({ message: error?.message || "Server error" });
    }
}

// Disconnect all accounts for the current user
// DELETE /api/accounts
export const disconnectAllAccounts = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const accounts = await Account.find({ user: req.user._id });

        for (const account of accounts) {
            if (account.zernioAccountId) {
                try {
                    await zernio.accounts.deleteAccount({
                        path: { accountId: account.zernioAccountId },
                    });
                } catch (error: any) {
                    console.error(`Failed to disconnect Zernio account ${account.zernioAccountId}:`, error);
                    // Continue disconnecting the rest even if one Zernio call fails
                }
            }
        }

        await Account.deleteMany({ user: req.user._id });

        if (accounts.length > 0) {
            await Activity.create({
                user: req.user._id,
                type: "account_disconnected",
                description: `Disconnected all social accounts (${accounts.length})`,
            });
        }

        res.json({ message: "All accounts disconnected successfully" });
    } catch (error: any) {
        res.status(500).json({ message: error?.message || "Server error" });
    }
};