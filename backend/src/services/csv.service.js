import csv from "async-csv";

export const parseCsv = (csvBuffer) => {
    const csvData = csvBuffer.toString("utf-8");
    return csv.parse(csvBuffer, { columns: true })
}