import { Locations, Location } from "../types/locations";
import { Activities } from "../types/activities";
import { dailyData } from "../types/wreport";
import { OpenMeteoAPIWrapper } from "../api/openMeteoAPIWrapper";
import { activityProcessor } from "./activityProcessor";
import { globalSettings, globalLocations, globalActivities } from "./globals";
import { useWeatherStore } from "../lib/store";
import { sunCalculator } from "./sunCalculator";

export class WReportGenerator {
    weatherData: any;
    wReport: any; // TODO: Create a type/interface for this
    nDays: number;
    weatherAPI: OpenMeteoAPIWrapper;
    sunCalculator: sunCalculator;
    activityProcessor: activityProcessor;

    constructor() {
        this.nDays = globalSettings.nDays;
        this.weatherAPI = new OpenMeteoAPIWrapper();
        this.activityProcessor = new activityProcessor(globalActivities);
        this.sunCalculator = new sunCalculator();
    }

    async generateReport(locations: Locations) {
        this.wReport = this.defaultReport();
        const locationReports = await this.getReportForLocations(
            locations.locations
        );
        for (const report of locationReports) {
            this.wReport.locations[report.id] = report;
        }
    }

    async getReportForLocations(locations: Location[]) {
        await this.weatherAPI.getWeatherData(locations);
        const locationReports = [];
        for (const location of locations) {
            const locId: number = location.id;
            let locationReport = this.getReportForLocation(location);
            locationReports.push(locationReport);
        }
        return locationReports;
    }

    getReportForLocation(location: Location) {
        let locationReport = {
            id: location.id,
            name: location.name,
            display_name: location.display_name,
            country: location.country,
            elevation: location.elevation,
            latitude: location.latitude,
            longitude: location.longitude,
            timezone: location.timezone,
            tags: location.tags,
            notes: location.notes,
            activities: null,
            weather: this.getWeatherForLocation(location),
        };
        locationReport.activities = this.getActivitiesForLocation(location);
        return locationReport;
    }

    private getActivitiesForLocation(location: Location, locationWeather) {
        let activities: any = {};
        for (const activity of location.activities) {
            activities[activity] = {
                icon: globalActivities.activities[activity].icon,
                display_name:
                    globalActivities.activities[activity].display_name,
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
        this.calcActivitiesForDay(location, day);
        return day;
    }
    private calcActivitiesForDay(location: Location, day: any) {
        let activityWeather = this.activityProcessor.getDayWeather(
            location,
            day
        );
        day.activityWeather = activityWeather;
        [day.activitiesGood, day.activitiesAcceptable] =
            this.activityProcessor.getActivityStatus(activityWeather);
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

        const dayDate = new Date();
        dayDate.setDate(dayDate.getDate() + dayIndex);
        dayDate.setHours(0, 0, 0, 0);
        const sunTimes = this.sunCalculator.getSunTimes(
            dayDate,
            location.latitude,
            location.longitude
        );

        const nightEnd = sunTimes.nightEnd
            ? sunTimes.nightEnd.toISOString()
            : "";
        const sunrise = sunTimes.sunrise ? sunTimes.sunrise.toISOString() : "";
        const goldenHourEnd = sunTimes.goldenHourEnd
            ? sunTimes.goldenHourEnd.toISOString()
            : "";
        const solarNoon = sunTimes.solarNoon
            ? sunTimes.solarNoon.toISOString()
            : "";
        const goldenHourStart = sunTimes.goldenHour
            ? sunTimes.goldenHour.toISOString()
            : "";
        const sunset = sunTimes.sunset ? sunTimes.sunset.toISOString() : "";
        const nightStart = sunTimes.night ? sunTimes.night.toISOString() : "";

        const moonTimes = this.sunCalculator.getMoonTimes(
            dayDate,
            location.latitude,
            location.longitude
        );
        const moonrise = moonTimes.rise ? moonTimes.rise.toISOString() : "";
        const moonset = moonTimes.set ? moonTimes.set.toISOString() : "";

        const moonIllumination =
            this.sunCalculator.getMoonIllumination(dayDate);
        const moonFraction = moonIllumination.fraction;
        let daily = {
            weatherCode: weatherCode,
            temperature: temperature,
            sunDuration: sunDuration,
            sunPercentage: sunPercentage,
            precipitation: precipitation,
            snowfall: snowfall,
            uvIndex: uvIndex,
            snowdepth: snowdepth,
            precipitationHours: precipitationHours,
            maxWindSpeed: maxWindSpeed,
            precipitationProbability: precipitationProbability,
            nightEnd: nightEnd,
            sunrise: sunrise,
            goldenHourEnd: goldenHourEnd,
            solarNoon: solarNoon,
            goldenHourStart: goldenHourStart,
            sunset: sunset,
            nightStart: nightStart,
            moonrise: moonrise,
            moonset: moonset,
            moonFraction: moonFraction,
            activitiesGood: null,
            activitiesAcceptable: null,
            activityWeather: null,
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
