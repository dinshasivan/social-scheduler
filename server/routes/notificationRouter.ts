import express from "express";

const notificationRouter = express.Router();

import { getNotifications, markAllNotificationsRead } from "../controllers/notificationsController.js";
import { protect } from "../middleware/authMiddleware.js";

notificationRouter.get('/', protect, getNotifications);
notificationRouter.patch('/read-all', protect, markAllNotificationsRead);

export default notificationRouter;