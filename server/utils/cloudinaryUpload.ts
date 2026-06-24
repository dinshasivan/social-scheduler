import cloudinary from "../config/cloudinary.js";

interface UploadResult {
    url: string;
    publicId: string;
}

/**
 * Uploads a raw file buffer (image or video) to Cloudinary using an upload stream,
 * so we never have to write a temp file to disk.
 */
export const uploadBufferToCloudinary = (
    buffer: Buffer,
    folder = "generated-posts",
    resourceType: "image" | "video" = "image"
): Promise<UploadResult> => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder, resource_type: resourceType },
            (error, result) => {
                if (error || !result) {
                    return reject(error || new Error("Cloudinary upload failed"));
                }
                resolve({ url: result.secure_url, publicId: result.public_id });
            }
        );
        uploadStream.end(buffer);
    });
};