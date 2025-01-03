import { WReportGenerator } from "./wReportGenerator";
import { globalActivities, globalLocations } from "./globals";
import { debugDownloadIfWeb } from "./debugHelper";

export async function loadData() {
    // Fetch data and build the wreport
    const wReportGen = new WReportGenerator(globalActivities, globalLocations);
    await wReportGen.generateReport();

    debugDownloadIfWeb(wReportGen.wReport, "wreport-output.json");

    return wReportGen;
}