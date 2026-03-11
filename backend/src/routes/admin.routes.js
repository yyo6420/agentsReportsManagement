import express from "express";
import { createAgent } from "../services/agents.service.js";
import asyncHandler from "../utills/asyncHandler.js";
import { auth } from "../middleWares/auth.middleware.js";
import { hashPassword } from "../services/password.service.js";

const router = express.Router();

router.post("/users", auth(["admin"]), asyncHandler(async (request, response) => {
    const { agentCode, password, role } = request.body;
    if (!agentCode || !password) throw new Error("you must type a agentCode and password");
    const hashedPassword = await hashPassword(password);
    const agent = await createAgent(agentCode, hashedPassword, role || "agent");

    response.status(201).send({ message: "agent created successfully", agent });
}))

export default router;