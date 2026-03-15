import express from "express";
import morgan from "morgan";
import cors from "cors";
import { makemongoConnection } from "./src/mongodb/mongodb.js";
import authRoutes from "./src/routes/auth.routes.js";
import reportsRoutes from "./src/routes/reports.routes.js";
import adminRoutes from './src/routes/admin.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan("tiny"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

await makemongoConnection();

app.use("/api/auth", authRoutes);

app.use("/api/reports", reportsRoutes);

app.use("/api/admin", adminRoutes);

app.get("/", async (request, response) => {
    response.json({
        message: "Welcome to Agents Reports Management API",
        version: "1.0.0",
    });
});

app.listen(PORT, async () => {
    console.log(`listening on port ${PORT}...`);
});