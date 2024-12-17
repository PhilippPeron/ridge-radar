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
}
