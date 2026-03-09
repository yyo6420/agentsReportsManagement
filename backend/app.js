import express from "express";
import morgan from "morgan";
import { makemongoConnection } from "./src/mongodb/mongodb.js";
import authRoutes from "./src/routes/auth.routes.js"

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan("tiny"));

app.use(express.json());

await makemongoConnection();

app.use("/api/auth", authRoutes);

app.get("/", async (request, response) => {
    response.json({
        message: "Welcome to Agents Reports Management API",
        version: "1.0.0",
    });
});

app.listen(PORT, async () => {
    console.log(`listening on port ${PORT}...`);
});