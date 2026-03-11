import { validateReport } from "../validation/reportValidation.js";
import { db, reportsCollection } from "../mongodb/mongodb.js";
import { ObjectId } from "mongodb";

export const postReport = (report, userId) => {
    const validateReport = validateReport(report);
    validateReport.userId = userId;
    validateReport.createdAt = new Date();
    validateReport.sourceType = "csv"
    return validateReport;
};

export const getReportById = async (id, userId, userRole) => {
    const report = await reportsCollection.findOne({ id: new ObjectId(id) });
    if (!report) throw new Error("report not found :(");
    if (userRole === "agent" && report.userId !== userId) {
        throw new Error("You are not authorized to get this report");
    }
    return report;
}