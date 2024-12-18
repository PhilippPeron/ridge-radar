import { Locations, Location } from "../types/locations";
import { Activities } from "../types/activities";
import { dailyData } from "../types/wreport";
import { OpenMeteoAPIWrapper } from "../api/openMeteoAPIWrapper";
import { activityProcessor } from "./activityProcessor";
import settings from "./settings";
// import * as fs from "fs";
import { act } from "react";

export class WReportGenerator {
    activities: Activities;
    locations: Locations;
    weatherData: any;
    wReport: any; // TODO: Create a type/interface for this
    nDays: number;
    weatherAPI: OpenMeteoAPIWrapper;
    activityProcessor: activityProcessor;

    constructor(activities: Activities, locations: Locations) {
        this.activities = activities;
        this.locations = locations;
        this.nDays = settings.nDays;
        this.weatherAPI = new OpenMeteoAPIWrapper();
        this.activityProcessor = new activityProcessor(this.activities);
    }

    async generateReport() {
        await this.weatherAPI.getWeatherData(this.locations);
        this.wReport = this.defaultReport();
        this.getReportForLocations();
    }

    private getReportForLocations() {
        for (const location of this.locations.locations) {
            let locationReport = this.getReportForLocation(location);
            this.wReport.locations.push(locationReport);
        }
    }

    private getReportForLocation(location: Location) {
        let locationReport = {
            id: location.id,
            name: location.name,
            country: location.country,
            elevation: location.elevation,
            latitude: location.latitude,
            longitude: location.longitude,
            activities: this.getActivitiesForLocation(location),
            weather: this.getWeatherForLocation(location),
        };
        return locationReport;
    }

    private getActivitiesForLocation(location: Location) {
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

    private getWeatherForLocation(location: Location) {
        // Iterate over this.nDays days of weather data
        let weather = {
            days: this.getDaysForWeather(location),
        };
        return weather;
    }

    private getDaysForWeather(location: Location) {
        let days = [];
        for (let i = 0; i < this.nDays; i++) {
            days.push(this.getDayForWeather(location, i));
        }
        return days;
    }

    private getDayForWeather(location: Location, dayIndex: number) {
        let date = this.getDateForDay(dayIndex);
        let dayOfWeek = this.getDayOfWeekForDay(date);
        let daily = this.getDailyForDay(location, dayIndex);
        let hourly = this.getHourlyForDay(location, dayIndex);
        let iconPath = this.getIconPathForDay(daily);
        let title = this.getTitleForDay(dayOfWeek, dayIndex);

        let day = {
            date: date.toISOString(),
            day_of_week: dayOfWeek,
            hourly: hourly,
            daily: daily,
            icon_path: iconPath,
            title: title,
        };
        return day;
    }

    private getDateForDay(dayIndex: number): Date {
        let date = new Date();
        date.setDate(date.getDate() + dayIndex);
        return date;
    }

    private getDayOfWeekForDay(date: Date) {
        return date.toLocaleDateString("de-DE", { weekday: "long" });
    }

    private getDailyForDay(location: Location, dayIndex: number) : dailyData {
        let temperature = this.weatherAPI.getDayTemperature(location, dayIndex);
        let sunDuration = this.weatherAPI.getDaySunDuration(location, dayIndex);
        let sunPercentage = this.weatherAPI.getDaySunPercentage(
            location,
            dayIndex
        );
        let precipitation = this.weatherAPI.getDayPrecipitation(
            location,
            dayIndex
        );
        let snowfall = this.weatherAPI.getDaySnowfall(location, dayIndex);
        let activityWeather = this.activityProcessor.getDayWeather(
            location,
            dayIndex
        );
        let activitiesGood =
            this.activityProcessor.getActivitiesGood(activityWeather);
        let activitiesAcceptable =
            this.activityProcessor.getActivitiesAcceptable(activityWeather);
        let daily = {
            temperature: temperature,
            sunDuration: sunDuration,
            sunPercentage: sunPercentage,
            precipitation: precipitation,
            snowfall: snowfall,
            activitiesGood: activitiesGood,
            activitiesAcceptable: activitiesAcceptable,
            activityWeather: activityWeather,
        };
        return daily;
    }
    private getHourlyForDay(location: Location, dayIndex: number) {
        //TODO: Implement later
        return [];
    }

    private getIconPathForDay(daily: any) {
        //TODO: Implement
        return "";
    }

    private getTitleForDay(dayOfWeek: string, dayIndex: number) {
        if (dayIndex === 0) {
            return "Heute";
        } else if (dayIndex === 1) {
            return "Morgen";
        }
        return dayOfWeek;
    }

    private defaultReport() {
        const report = {
            last_updated: new Date().toISOString(),
            format_version: 0, // TODO: Move to a constant
            locations: [],
        };
        return report;
    }
}

// Run with the launch debug config in vs code or with npx tsc; node .\dist\create_report.js
(async () => {
    console.time("Report Generation Time");

    const locs = require("../data/examples/locations.json");
    // const locs = JSON.parse(
    //     fs.readFileSync("./data/examples/locations.json", "utf-8")
    // );
    const acts = require("../data/examples/activities.json");
    // const acts = JSON.parse(
    //     fs.readFileSync("./data/examples/activities.json", "utf-8")
    // );

    const generator = new WReportGenerator(acts, locs);
    await generator.generateReport();
    // let outputPath = "./data/examples/wreport-output.json";
    // fs.writeFileSync(outputPath, JSON.stringify(generator.wReport, null, 2), "utf-8");
    console.log(`Report written to ${outputPath}`);
    console.log(generator.wReport);

    console.timeEnd("Report Generation Time");
})();
