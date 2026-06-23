import express from "express"
import { protect } from "../middleware/authMiddleware.js";
import { generatePost } from "../controllers/postController.js";

const postRouter = express.Router();

postRouter.post('/generate', protect,generatePost)

export default postRouter