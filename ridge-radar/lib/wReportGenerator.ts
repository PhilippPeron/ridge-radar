import { Locations, Location } from "../types/locations";
import { Activities } from "../types/activities";
import { OpenMeteoAPI } from "../api/openMeteoAPI";
import * as fs from 'fs';

export class WReportGenerator {
    activities: Activities;
    locations: Locations;
    weatherData: any;
    wReport: any; // TODO: Create a type/interface for this
    
    constructor(activities: Activities, locations: Locations) {
        this.activities = activities;
        this.locations = locations;
    }

    generateReport() {
        const weatherAPI = new OpenMeteoAPI();
        this.weatherData = weatherAPI.getWeatherData(this.locations);
        this.wReport = this.defaultReport();
        this.generateReportForLocations();
        return this.wReport;
    }

    generateReportForLocations() {
        for (const location of this.locations.locations) {
            let locationReport = this.generateReportForLocation(location)
            this.wReport.locations.push(locationReport);
        }
    }

    generateReportForLocation(location: Location) {
        let locationReport = {
            id: location.id,
            name: location.name,
            country: location.country,
            elevation: location.elevation,
            latitude: location.latitude,
            longitude: location.longitude,
            activities: this.generateActivitiesForLocation(location),
            weather: this.generateWeatherForLocation(location),
        };
        return locationReport;
    }

    generateActivitiesForLocation(location: Location) {
        let activities: any = {};
        for (const activity of location.activities) {
            activities[activity] = {
                icon: this.activities.activities[activity].icon,
                display_name: this.activities.activities[activity].display_name,
                description: this.activities.activities[activity].description,
            };
        }
        return activities;
    }

    generateWeatherForLocation(location: Location) {
        // CONTINUE HERE <--------------------------------------------------------------
    }

    defaultReport() {
        const report = {
            last_updated: new Date().toISOString(),
            format_version: 0, // TODO: Move to a constant
            locations: [],
        };
        return report;
    }
}


// Run with the launch debug config in vs code or with npx tsc; node .\dist\create_report.js
(() => {
    const locs = JSON.parse(fs.readFileSync('./data/examples/locations.json', 'utf-8'));
    const acts = JSON.parse(fs.readFileSync('./data/examples/activities.json', 'utf-8'));

    const generator = new WReportGenerator(acts, locs);
    const report = generator.generateReport();
    let outputPath = './data/examples/report-output.json';
    fs.writeFileSync(outputPath, JSON.stringify(report, null, 2), 'utf-8');
    console.log(`Report written to ${outputPath}`);
})();