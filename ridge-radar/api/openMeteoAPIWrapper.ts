import { OpenMeteoAPI } from "./openMeteoAPI";
import { Locations } from "../types/locations";
import { Location } from "../types/locations";
import { weatherData } from "../types/weatherData";

export class OpenMeteoAPIWrapper {
    openMeteoAPI: OpenMeteoAPI;
    weatherData: weatherData;

    constructor() {
        this.openMeteoAPI = new OpenMeteoAPI();
        this.weatherData = {};
    }

    async getWeatherData(locations: Locations) {
        console.time("OpenMeteo Data Fetch Time");
        const newWeatherData = await this.openMeteoAPI.getWeatherData(
            locations
        );
        Object.assign(this.weatherData, newWeatherData);
        console.timeEnd("OpenMeteo Data Fetch Time");
    }
    getDayWeatherCode(location: Location, dayIndex: number) {
        return this.weatherData[location.id].daily.weather_code[dayIndex];
    }
    getDayTemperature(location: Location, dayIndex: number) {
        return {
            min: this.weatherData[location.id].daily.temperature_2m_min[
                dayIndex
            ],
            max: this.weatherData[location.id].daily.temperature_2m_max[
                dayIndex
            ],
            unit: "°C",
        };
    }
    getDaySunDuration(location: Location, dayIndex: number) {
        return (
            this.weatherData[location.id].daily.sunshine_duration[dayIndex] /
            3600
        );
    }
    getDaySunPercentage(location: Location, dayIndex: number) {
        return (
            this.weatherData[location.id].daily.sunshine_duration[dayIndex] /
            this.weatherData[location.id].daily.daylight_duration[dayIndex]
        );
    }
    getDayPrecipitation(location: Location, dayIndex: number) {
        return {
            value:
                this.weatherData[location.id].daily.rain_sum[dayIndex] +
                this.weatherData[location.id].daily.showers_sum[dayIndex],
            unit: "mm",
        };
    }
    getDaySnowfall(location: Location, dayIndex: number) {
        return {
            value: this.weatherData[location.id].daily.snowfall_sum[dayIndex],
            unit: "cm",
        };
    }

    getHourlyTimeRange(location: Location, dayIndex: number) {
        // Find index of last hour of today
        const times = this.weatherData[location.id].hourly.time;
        // Find index of last hour of today by comparing string values at 8 and 9
        const todayDate = new Date(times[0]).toDateString();
        const lastHourIndex = times.findIndex(
            (time) => new Date(time).toDateString() !== todayDate
        );
        console.log("Last Hour Index: ", lastHourIndex);
        const startIndex = dayIndex * 24;
        const endIndex = lastHourIndex + dayIndex * 24;
        return {
            startIndex: startIndex,
            endIndex: endIndex,
            time: times.slice(startIndex, endIndex),
        };
    }
}
