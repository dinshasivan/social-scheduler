import express from "express";
import { addAccounts, disconnectAccounts, disconnectAllAccounts, getAccounts } from "../controllers/accountControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const accountRouter = express.Router();

accountRouter.get('/',protect, getAccounts);
accountRouter.post('/',protect, addAccounts)
accountRouter.delete('/:id',protect, disconnectAccounts)
accountRouter.delete("/", protect, disconnectAllAccounts);

export default accountRouter