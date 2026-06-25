import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getDashboardData } from "../controllers/dashboardController.js";

const dashboardRoute = express.Router();

dashboardRoute.get("/", protect, getDashboardData);

export default dashboardRoute;