import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import {
  checkBalance,
  moneyTransfer,
} from "../controllers/account.controller.js";

const router = express.Router();

router.post("/balance", authenticateToken, checkBalance);
router.post("/transfer", authenticateToken, moneyTransfer);

export default router; 