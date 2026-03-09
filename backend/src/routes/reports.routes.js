import express from "express";
import asyncHandler from "../utills/asyncHandler.js";
import { auth } from "../middleWares/auth.middleware.js";

const router = express.Router();

router.post("/", auth(["agent", "admin"]), async () => {})

export default router;