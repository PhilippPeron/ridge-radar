import { WReportGenerator } from "./wReportGenerator";

export async function loadData() {
    // Fetch data and build the wreport
    console.time("Report Generation Time");
    const locs = require("../data/examples/locations.json");
    const acts = require("../data/examples/activities.json");
    const wReportGen = new WReportGenerator(acts, locs);
    await wReportGen.generateReport();

    console.timeEnd("Report Generation Time");
    return wReportGen;
}