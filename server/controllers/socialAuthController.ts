import { Request, Response } from "express";
import zernio from "../config/zernio.js";
import { User } from "../models/User.js";
import { Account } from "../models/Account.js";
import { Activity } from "../models/Activity.js";
import { AuthRequest } from "../middleware/authMiddleware.js";


// Helper to ensure user has a zernio profile
const getOrCreateZernioProfile = async (user: any) => {

    if (user.zernioProfileId) {
        return user.zernioProfileId;
    }

    try {
        const createResult = await zernio.profiles.createProfile({
            body: { name: `${user.name || user.email}'s workspace` } as any,
        });
        const created = (createResult.data as any)?.profile || createResult.data;
        const pid = created?._id || created?.id;

        if (!pid) {
            throw new Error("Failed to create Zernio profile - no ID returned");
        }

        await User.findByIdAndUpdate(user._id, { zernioProfileId: pid });
        return pid;

    } catch (error: any) {
        console.error("getOrCreateZernioProfile Error:", error);
        throw error;
    }
};


// Generate OAuth authorization URL
// GET /api/oauth/:platform/url
export const generateAuthUrl = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const platform = req.params.platform as string;

        const zernioPlatformMap: { [key: string]: string } = {
            facebook: "facebook-page",
            instagram: "instagram",
            linkedin: "linkedin",
            twitter: "twitter",
        };

        const zernioPlatform = zernioPlatformMap[platform] ?? platform;
        console.log("generateAuthUrl:", platform, "→", zernioPlatform);

        const profileId = await getOrCreateZernioProfile(req.user);

        const origin = req.headers.origin;
        const redirectUrl = `${origin}/accounts`;

        const result = await zernio.connect.getConnectUrl({
            path: { platform: zernioPlatform as any },
            query: {
                profileId,
                redirect_url: redirectUrl
            }
        });

        const data = result.data as any;
        console.log("getConnectUrl response:", JSON.stringify(data, null, 2));

        const authUrl = data.authUrl;
        if (!authUrl) {
            throw new Error(`Zernio returned no authUrl. Full response: ${JSON.stringify(data)}`);
        }
        res.json({ url: authUrl });

    } catch (error: any) {
        res.status(500).json({ message: error?.message || "Server error" });
    }
};

// Sync connected accounts from zernio into mongodb
// GET /api/auth/sync
export const syncAccounts = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const profileId = await getOrCreateZernioProfile(req.user);
        console.log("syncAccounts userId:", req.user._id);
        const result = await zernio.accounts.listAccounts({
            query: { profileId } as any
        })

        const data = result.data as any;
        const zernioAccounts: any[] = data?.accounts || (Array.isArray(data) ? data : []);
        console.log("Zernio accounts raw:", JSON.stringify(zernioAccounts, null, 2));
        const supportedPlatforms = ["twitter", "linkedin", "facebook", "instagram"];
        const syncedAccounts = [];

        for (const zAccount of zernioAccounts) {
            const zid = zAccount._id || zAccount.id;
            if (!zid) {
                console.warn("Skipping account with no ID", zAccount);
                continue;
            }

            const rawPlatform = (zAccount.platform || zAccount.type || "").toLowerCase();
            const normalizedPlatform = supportedPlatforms.find((p) => rawPlatform.includes(p));

            if (!normalizedPlatform) {
                console.log(`Skipping unsupported platform: "${rawPlatform}" `);
                continue;
            }

            // Check BEFORE upserting so we know whether this is a brand-new connection
            const existingAccount = await Account.findOne({ zernioAccountId: zid });
            const isNewConnection = !existingAccount;

            const handle = zAccount.username || zAccount.name || zAccount.handle || "Unknown";

            const account = await Account.findOneAndUpdate(
                { zernioAccountId: zid },
                {
                    user: req.user._id,
                    platform: normalizedPlatform,
                    handle,
                    zernioAccountId: zid,
                    status: "connected",
                    avatarUrl: zAccount.avatarUrl || zAccount.picture || zAccount.profile_image_url,
                },
                { upsert: true, new: true }
            )
            syncedAccounts.push(account)

            // Only log activity for genuinely new connections, not every sync poll
            if (isNewConnection) {
                await Activity.create({
                    user: req.user._id,
                    type: "account_connected",
                    description: `Connected ${normalizedPlatform} account (${handle})`,
                });
            }
        }
        res.json(syncedAccounts)
    } catch (error: any) {
        res.status(500).json({ message: error?.message || "Server error" })
    }
}