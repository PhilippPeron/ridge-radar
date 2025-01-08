import { WReportGenerator } from "./wReportGenerator";
import { debugDownloadIfWeb } from "./debugHelper";
import { globalLocations } from "./globals";

export async function loadData() {
    // Fetch data and build the wreport;
    
    const wReportGen: WReportGenerator = new WReportGenerator()

    await wReportGen.generateReport(globalLocations);

    debugDownloadIfWeb(wReportGen.wReport, "wreport-output.json");

    return wReportGen;
}