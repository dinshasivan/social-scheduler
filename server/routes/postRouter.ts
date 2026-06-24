import express from "express"
import { protect } from "../middleware/authMiddleware.js";
import { generatePost, getGenerations, getPosts, schedulePost } from "../controllers/postController.js";

const postRouter = express.Router();

postRouter.post('/generate', protect,generatePost)
postRouter.get('/generations', protect, getGenerations)
postRouter.post('/schedule',protect, schedulePost)
postRouter.get('/getpost',protect, getPosts)

export default postRouter