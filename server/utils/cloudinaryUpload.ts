import cloudinary from "../config/cloudinary.js";

interface UploadResult {
    url: string;
    publicId: string;
}

/**
 * Uploads a raw image buffer (e.g. from axios arraybuffer response) to Cloudinary
 * using an upload stream, so we never have to write a temp file to disk.
 */
export const uploadBufferToCloudinary = (
    buffer: Buffer,
    folder = "generated-posts"
): Promise<UploadResult> => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder, resource_type: "image" },
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