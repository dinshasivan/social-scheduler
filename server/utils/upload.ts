import multer from "multer";

// Memory storage: keeps the file as a Buffer in req.file.buffer instead of
// writing to disk, so we can stream it straight to Cloudinary.
const storage = multer.memoryStorage();

export const upload = multer({
    storage,
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB cap — adjust to taste
    fileFilter: (_req, file, cb) => {
        const isImage = file.mimetype.startsWith("image/");
        const isVideo = file.mimetype.startsWith("video/");
        if (isImage || isVideo) {
            cb(null, true);
        } else {
            cb(new Error("Only image or video files are allowed"));
        }
    },
});