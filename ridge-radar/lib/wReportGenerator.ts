import { Locations, Location } from "../types/locations";
import { Activities } from "../types/activities";
import { dailyData } from "../types/wreport";
import { OpenMeteoAPIWrapper } from "../api/openMeteoAPIWrapper";
import { activityProcessor } from "./activityProcessor";
import { globalSettings, globalLocations, globalActivities } from "./globals";
import { act } from "react";

export class WReportGenerator {
    weatherData: any;
    wReport: any; // TODO: Create a type/interface for this
    nDays: number;
    weatherAPI: OpenMeteoAPIWrapper;
    activityProcessor: activityProcessor;

    constructor() {
        this.nDays = globalSettings.nDays;
        this.weatherAPI = new OpenMeteoAPIWrapper();
        this.activityProcessor = new activityProcessor(globalActivities);
    }

    async generateReport(locations: Locations) {
        this.wReport = this.defaultReport();
        await this.getReportForLocations(locations.locations);
    }

    async getReportForLocations(locations: Location[]) {
        await this.weatherAPI.getWeatherData(locations);
        for (const location of locations) {
            const locId: number = location.id;
            let locationReport = this.getReportForLocation(location);
            this.wReport.locations[locId] = locationReport;
        }
    }

    getReportForLocation(location: Location) {
        let locationReport = {
            id: location.id,
            name: location.name,
            country: location.country,
            elevation: location.elevation,
            latitude: location.latitude,
            longitude: location.longitude,
            timezone: location.timezone,
            activities: this.getActivitiesForLocation(location),
            weather: this.getWeatherForLocation(location),
        };
        return locationReport;
    }

    private getActivitiesForLocation(location: Location) {
        let activities: any = {};
        for (const activity of location.activities) {
            activities[activity] = {
                icon: globalActivities.activities[activity].icon,
                display_name: globalActivities.activities[activity].display_name,
                description: globalActivities.activities[activity].description,
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

    private getDailyForDay(location: Location, dayIndex: number): dailyData {
        let weatherCode = this.weatherAPI.getDayWeatherCode(location, dayIndex);
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
        let sunrise = this.weatherAPI.getDaySunrise(location, dayIndex);
        let sunset = this.weatherAPI.getDaySunset(location, dayIndex);
        let uvIndex = this.weatherAPI.getDayUVIndex(location, dayIndex);
        let snowdepth = this.weatherAPI.getDaySnowdepth(location, dayIndex);
        let precipitationHours = this.weatherAPI.getDayPrecipitationHours(
            location,
            dayIndex
        );
        let maxWindSpeed = this.weatherAPI.getDayMaxWindSpeed(
            location,
            dayIndex
        );
        let precipitationProbability =
            this.weatherAPI.getDayPrecipitationProbability(location, dayIndex);
        let activityWeather = this.activityProcessor.getDayWeather(
            location,
            dayIndex
        );
        let activitiesGood =
            this.activityProcessor.getActivitiesGood(activityWeather);
        let activitiesAcceptable =
            this.activityProcessor.getActivitiesAcceptable(activityWeather);
        let daily = {
            weatherCode: weatherCode,
            temperature: temperature,
            sunDuration: sunDuration,
            sunPercentage: sunPercentage,
            precipitation: precipitation,
            snowfall: snowfall,
            sunrise: sunrise,
            sunset: sunset,
            uvIndex: uvIndex,
            snowdepth: snowdepth,
            precipitationHours: precipitationHours,
            maxWindSpeed: maxWindSpeed,
            precipitationProbability: precipitationProbability,
            activitiesGood: activitiesGood,
            activitiesAcceptable: activitiesAcceptable,
            activityWeather: activityWeather,
        };
        return daily;
    }
    private getHourlyForDay(location: Location, dayIndex: number) {
        let { startIndex, endIndex, time } = this.weatherAPI.getHourlyTimeRange(
            location,
            dayIndex
        );
        let hourly: { [key: string]: any } = {
            time: time,
        };
        let hourlyData = this.weatherAPI.getHourlyData(
            location,
            startIndex,
            endIndex
        );
        Object.assign(hourly, hourlyData);
        return hourly;
    }

    private getIconPathForDay(daily: any) {
        //TODO: Check if needed; If yes, implement
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
            locations: {},
        };
        return report;
    }
}


let globalReportGenerator: WReportGenerator = new WReportGenerator()

export {globalReportGenerator};
