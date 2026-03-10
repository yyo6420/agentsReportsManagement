import express from "express";
import asyncHandler from "../utills/asyncHandler.js";
import { verifyPassword } from "../services/password.service.js";
import { getAgent, getAgentById } from "../services/agents.service.js";
import { generateToken } from "../services/jwt.service.js";
import { auth } from "../middleWares/auth.middleware.js";

const router = express.Router();

router.post("/login", asyncHandler(async (request, response) => {
    const { agentCode, password } = request.body;
    if (!agentCode || !password) {
        return response.status(400).send({ message: "you must type a agentCode and password" })
    }

    const agent = await getAgent({ agentCode });
    if (!agent) {
        return response.status(401).send({ message: "Sorry, your login information is invalid, try again" });
    }

    const isVerified = await verifyPassword(password, agent.password);
    if (!isVerified) {
        return response.status(401).send({ message: "Sorry, your login information is invalid, try again" });
    }

    const token = generateToken({ id: agent._id, role: agent.role });
    response.status(200).send({ token: token });
}))

router.get("/me", auth(["agent", "admin"]), asyncHandler(async (request, response) => {
    const userProfile = await getAgentById(request.agentId, ["password"]);
    if (!userProfile) throw new Error("user not exits ;(");
    response.send(userProfile);
}))
export default router;