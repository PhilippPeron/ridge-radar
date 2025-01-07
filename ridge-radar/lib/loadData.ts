import { globalReportGenerator } from "./wReportGenerator";
import { debugDownloadIfWeb } from "./debugHelper";
import { globalLocations } from "./globals";

export async function loadData() {
    // Fetch data and build the wreport;
    await globalReportGenerator.generateReport(globalLocations);

    debugDownloadIfWeb(globalReportGenerator.wReport, "wreport-output.json");

    return globalReportGenerator;
}