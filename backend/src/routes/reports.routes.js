import express from "express";
import asyncHandler from "../utills/asyncHandler.js";
import { auth } from "../middleWares/auth.middleware.js";
import { uploadImage, uploadCsv } from "../middleWares/multer.middleware.js"
import { parseCsv } from "../services/csv.service.js";
import { getdb } from "../mongodb/mongodb.js";
import { postReport } from "../services/reports.servicre.js";

const db = await getdb(process.env.DB_NAME);
const reportsCollection = db?.collection("reports");

const router = express.Router();

router.post("/csv", uploadCsv.single("csv"), asyncHandler(async (request, response) => {
    const reports = await parseCsv(request.file.buffer);
    const validateReports = reports.map(report => postReport(report, request.agentId || 1));
    await reportsCollection.insertMany(validateReports);
    response.status(201).send({ message: "The CSV file are uploaded successfuly ;)" })
}))

router.post("/form", uploadImage.single("image"), asyncHandler(async (request, response) => {
    const report = postReport(request.body, request.agentId || 1);
    if (request.file) report.imagePath = request.file.path;
    const result = await reportsCollection.insertOne(report);
    response.status(201).send({ ...report, id: result.insertId })
}))

export default router;