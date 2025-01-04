import { OpenMeteoAPI } from "./openMeteoAPI";
import { Locations } from "../types/locations";
import { Location } from "../types/locations";
import { weatherData, weatherDataForLocation } from "../types/weatherData";

export class OpenMeteoAPIWrapper {
    openMeteoAPI: OpenMeteoAPI;
    weatherData: weatherData;

    constructor() {
        this.openMeteoAPI = new OpenMeteoAPI();
        this.weatherData = {};
    }

    async getWeatherData(locations: Locations) {
        const newWeatherData = await this.openMeteoAPI.getWeatherData(
            locations
        );
        Object.assign(this.weatherData, newWeatherData);
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
    getDaySunrise(location: Location, dayIndex: number) {
        return this.weatherData[location.id].daily.sunrise[dayIndex];
    }
    getDaySunset(location: Location, dayIndex: number) {
        return this.weatherData[location.id].daily.sunset[dayIndex];
    }
    getDayUVIndex(location: Location, dayIndex: number) {
        return this.weatherData[location.id].daily.uv_index_max[dayIndex];
    }
    getDaySnowdepth(location: Location, dayIndex: number) {
        // console.log(this.weatherData[location.id].hourly.snow_depth);
        const index = 24*dayIndex+12;
        console.log(index)
        // console.log(this.weatherData[location.id].hourly.snow_depth)
        console.log(String(this.weatherData[location.id].hourly.snow_depth[index]))
        return {
            value: this.weatherData[location.id].hourly.snow_depth[24*dayIndex+12],
            unit: "cm",
        };
    }
    getDayPrecipitationHours(location: Location, dayIndex: number) {
        return this.weatherData[location.id].daily.precipitation_hours[dayIndex];
    }
    getDayMaxWindSpeed(location: Location, dayIndex: number) {
        return {
            value: this.weatherData[location.id].daily.wind_speed_10m_max[dayIndex],
            unit: "km/h",
        };
    }
    getDayPrecipitationProbability(location: Location, dayIndex: number) {
        return this.weatherData[location.id].daily.precipitation_probability_max[
            dayIndex
        ];
    }

    getHourlyTimeRange(location: Location, dayIndex: number) {
        const times = this.weatherData[location.id].hourly.time;
        const startIndex = dayIndex * 24;
        const endIndex = startIndex + 24;
        return {
            startIndex: startIndex,
            endIndex: endIndex,
            time: times.slice(startIndex, endIndex),
        };
    }

    getHourlyData(location: Location, startIndex: number, endIndex: number) {
        const nameMapping: Record<string, keyof weatherDataForLocation["hourly"]> = {
            temperature: "temperature_2m",
            precipitation: "precipitation",
            precipitationProbability: "precipitation_probability",
            snowfall: "snowfall",
            snowDepth: "snow_depth",
            weatherCode: "weather_code",
            visibility: "visibility",
            sunshineDuration: "sunshine_duration",
            isDay: "is_day",
        };
        let hourlyData: { [key: string]: number[] } = {};
        for (let key in nameMapping) {
            const mappedKey = nameMapping[key];
            if (key !== 'time') {
                hourlyData[key] = this.weatherData[location.id].hourly[mappedKey].slice(startIndex, endIndex) as number[];
            }
        }
        return hourlyData;
    }
}
