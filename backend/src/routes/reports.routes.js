import express from "express";
import asyncHandler from "../utills/asyncHandler.js";
import { uploadImage, uploadCsv } from "../middleWares/multer.middleware.js"
import { parseCsv } from "../services/csv.service.js";
import { db, reportsCollection } from "../mongodb/mongodb.js";
import { getReportById, postReport } from "../services/reports.servicre.js";
import { auth } from "../middleWares/auth.middleware.js";

const router = express.Router();

router.post("/csv", auth(["agent", "admin"]), uploadCsv.single("csv"), asyncHandler(async (request, response) => {
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

router.get("/", auth(["agent", "admin"]), asyncHandler(async (request, response) => {
    if (!reportsCollection) {
        reportsCollection = db?.collection("reports");
    }

    const filter = (request.userRole === "admin") ? {} : { userId: request.agentId };
    const reports = await reportsCollection.find(filter).toArray();
    response.send(reports);
}))

router.get("/:id", auth(["agent", "admin"]), asyncHandler(async (request, response) => {
    const report = await getReportById(request.params.id, request.agentId, request.userRole);
    response.send(report);
}))

export default router;