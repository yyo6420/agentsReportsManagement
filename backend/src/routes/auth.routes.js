import express from "express";
import asyncHandler from "../utills/asyncHandler.js";
import { hashPassword, verifyPassword } from "../services/password.service.js";
import { createAgent, getAgent, getAgentById } from "../services/agents.service.js";
import { generateToken } from "../services/jwt.service.js";
import { auth } from "../middleWares/auth.middleware.js";

const router = express.Router();

router.post("/singup", auth(["admin"]), asyncHandler(async (request, response) => {
    const { agentCode, password } = request.body;
    if (!agentCode || !password) throw new Error("you must type a agentCode and password");
    const hashedPassword = await hashPassword(password);
    const agent = await createAgent(agentCode, hashedPassword);

    response.status(201).send({ massage: "agent created successfully", agent: agent });
}))
router.post("/login", asyncHandler(async (request, response) => {
    const { agentCode, password } = request.body;
    if (!agentCode || !password) throw new Error("you must type a agentCode and password");
    const agent = await getAgent({ agentCode });
    const isVerified = await verifyPassword(password, agent.password);
    if (!isVerified) throw new Error("Sorry, the password is not invalid");
    const token = generateToken({ id: agent._id, role: agent.role });
    response.status(200).send(token);
}))
router.get("/me", auth(["agent", "admin"]), asyncHandler(async (request, response) => {
    const userProfile = await getAgentById(request.agentId, ["password"]);
    if (!userProfile) throw new Error("user not exits ;(");
    response.send(userProfile);
}))
export default router;