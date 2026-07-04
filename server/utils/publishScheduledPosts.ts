import cron from "node-cron";
import { Post } from "../models/Post.js";
import { Account } from "../models/Account.js";
import { Activity } from "../models/Activity.js";
import zernio from "../config/zernio.js";

// Maps your DB platform slugs → Zernio's platform strings
const PLATFORM_MAP: Record<string, string> = {
    twitter:              "twitter",
    linkedin:             "linkedin",
    facebook:             "facebook-page",
    instagram:            "instagram",
    facebook_page:        "facebook-page",
    linkedin_page:        "linkedin",
    instagram_business:   "instagram",
};

export function startPublishJob() {
    // Runs every minute
    cron.schedule("* * * * *", async () => {
        try {
            // Find all posts whose scheduled time has passed and are still pending
            const duePosts = await Post.find({
                status: "scheduled",
                schedulerFor: { $lte: new Date() },
            });

            if (duePosts.length === 0) return;

            console.log(`[publishJob] Found ${duePosts.length} post(s) to publish`);

            for (const post of duePosts) {
                try {
                    // Look up connected accounts for this user that match the post's platforms
                    const accounts = await Account.find({
                        user: post.user,
                        status: "connected",
                        platform: { $in: post.platforms },
                    });

                    if (accounts.length === 0) {
                        console.warn(`[publishJob] Post ${post._id}: no connected accounts found for platforms ${post.platforms.join(", ")} — marking failed`);
                        await Post.findByIdAndUpdate(post._id, { status: "failed" });

                        await Activity.create({
                            user: post.user,
                            type: "post_failed",
                            description: `Failed to publish post — no connected accounts for ${post.platforms.join(", ")}`,
                        });

                        continue;
                    }

                    // Build the platforms array Zernio expects
                    const zernioPlatforms = accounts.map((acc) => ({
                        platform: PLATFORM_MAP[acc.platform] ?? acc.platform,
                        accountId: acc.zernioAccountId,
                    }));

                    // Build media items if the post has an image/video
                    const mediaItems = post.mediaUrl
                        ? [{ type: post.mediaType as "image" | "video", url: post.mediaUrl }]
                        : undefined;

                    const result = await zernio.posts.createPost({
                        body: {
                            content: post.content,
                            platforms: zernioPlatforms,
                            ...(mediaItems && { mediaItems }),
                            publishNow: true,
                        },
                    });

                    const resultData = result.data as any;
                    const zernioPostId = resultData?._id || resultData?.id || resultData?.post?._id;

                    await Post.findByIdAndUpdate(post._id, {
                        status: "published",
                        ...(zernioPostId && { zernioPostId }),
                    });

                    console.log(`[publishJob] Post ${post._id} published successfully → Zernio ID: ${zernioPostId ?? "unknown"}`);

                    const platformNames = accounts.map((acc) => acc.platform).join(", ");
                    await Activity.create({
                        user: post.user,
                        type: "post_published",
                        description: `Post published to ${platformNames}`,
                    });

                } catch (postErr: any) {
                    // One post failing shouldn't block the others
                    console.error(`[publishJob] Post ${post._id} failed:`, postErr?.message ?? postErr);
                    await Post.findByIdAndUpdate(post._id, { status: "failed" });

                    await Activity.create({
                        user: post.user,
                        type: "post_failed",
                        description: `Failed to publish post: ${postErr?.message ?? "Unknown error"}`,
                    });
                }
            }
        } catch (err) {
            console.error("[publishJob] Unexpected error:", err);
        }
    });

    console.log("[publishJob] Scheduler started — checking every minute");
}