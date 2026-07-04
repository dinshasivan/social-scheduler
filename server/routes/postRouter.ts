import express from "express"
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../utils/upload.js";
import { generatePost, getGenerations, getPosts, schedulePost } from "../controllers/postController.js";

const postRouter = express.Router();

postRouter.post('/generate', protect,generatePost)
postRouter.get('/generations', protect, getGenerations)
postRouter.post('/',protect, upload.single("media"), schedulePost)
postRouter.get('/',protect, getPosts)

export default postRouter