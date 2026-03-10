import { validateReport } from "../validation/reportValidation.js";

export const postReport = (report, userId) => {
    const validateReport = validateReport(report);
    validateReport.userId = userId;
    validateReport.createdAt = new Date();
    validateReport.sourceType = "csv"
    return validateReport;
};