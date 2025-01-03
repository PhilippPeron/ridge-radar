import { WReportGenerator } from "./wReportGenerator";
import { globalActivities, globalLocations } from "./globals";
import { debugDownloadIfWeb } from "./debugHelper";

export async function loadData() {
    // Fetch data and build the wreport
    console.time("Report Generation Time");
    const wReportGen = new WReportGenerator(globalActivities, globalLocations);
    await wReportGen.generateReport();
    console.timeEnd("Report Generation Time");

    debugDownloadIfWeb(wReportGen.wReport, "wreport-output.json");

    return wReportGen;
}