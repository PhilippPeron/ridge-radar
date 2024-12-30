import { WReportGenerator } from "./wReportGenerator";
import { globalActivities, globalLocations } from "./globals";

export async function loadData() {
    // Fetch data and build the wreport
    console.time("Report Generation Time");
    const wReportGen = new WReportGenerator(globalActivities, globalLocations);
    await wReportGen.generateReport();

    console.timeEnd("Report Generation Time");
    return wReportGen;
}