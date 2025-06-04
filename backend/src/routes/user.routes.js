import express from "express";
import {
  getAllUser,
  getUser,
  updateUser,
  userSignin,
  userSignup,
} from "../controllers/user.controller.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", userSignup);
router.post("/signin", userSignin);
router.put("/update", authenticateToken, updateUser);
router.get("/getUser",getUser)
router.get("/getAllUser",getAllUser)

export default router;   