export const validateReport = (report) => {
    const { category, urgency, message } = report;
    if (!category || !urgency || !message) throw new Error("Bad request");
    return {category, urgency, message};
}