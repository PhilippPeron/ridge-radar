import { globalReportGenerator } from "./wReportGenerator";
import { debugDownloadIfWeb } from "./debugHelper";

export async function loadData() {
    // Fetch data and build the wreport;
    await globalReportGenerator.generateReport();

    debugDownloadIfWeb(globalReportGenerator.wReport, "wreport-output.json");

    return globalReportGenerator;
}