import express from "express";
import {
  updateUser,
  userSignin,
  userSignup,
} from "../controllers/user.controller";
import { authenticateToken } from "../middleware/auth";

const router = express.Router();

router.post("/signup", userSignup);
router.post("/singin", userSignin);
router.put("/update", authenticateToken, updateUser);

module.export = router;
