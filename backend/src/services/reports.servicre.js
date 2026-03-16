import { validateReport } from "../validation/reportValidation.js";
import { db, reportsCollection } from "../mongodb/mongodb.js";
import { ObjectId } from "mongodb";

export const postReport = (report, userId) => {
    const validate = validateReport(report);
    validate.userId = userId;
    validate.createdAt = new Date();
    validate.sourceType = "csv"
    return validate;
};

export const getReportById = async (id, userId, userRole) => {
    if (!reportsCollection) {
        reportsCollection = db?.collection("reports");
    }

    const report = await reportsCollection.findOne({ id: new ObjectId(id) });
    if (!report) throw new Error("report not found :(");
    if (userRole === "agent" && report.userId !== userId) {
        throw new Error("You are not authorized to get this report");
    }
    return report;
}