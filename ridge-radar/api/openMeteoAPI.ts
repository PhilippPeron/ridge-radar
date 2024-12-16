import { Locations, Location } from "../types/locations";
import { fetchWeatherApi } from "openmeteo";
import settings from "../lib/settings";

const extraWeatherInfo = {
    gliding: {
        daily: [],
        hourly: ["wind_speed_400m", "wind_speed_800m", "wind_speed_1200m"],
        current: [],
    }, // example
};

// Mapping between report fields openmeteo api fields
const field_key_map = {
    hourly: {
        temperature: "temperature_2m",
        wind_speed: "wind_speed_10m",
        wind_direction: "wind_direction_10m",
        precipitation: "precipitation_sum",
        humidity: "humidity_2m",
        pressure: "pressure_sea_level",
        cloud_cover: "cloud_cover",
    },
};

export class OpenMeteoAPI {
    defaultFields = {
        daily: [
            "temperature_2m_max",
            "temperature_2m_min",
            "sunrise",
            "sunset",
            "daylight_duration",
            "sunshine_duration",
            "precipitation_sum",
            "rain_sum",
            "snowfall_sum",
        ],
        hourly: [
            "temperature_2m",
            "rain",
            "snowfall",
            "snow_depth",
            "cloud_cover",
        ],
        current: ["temperature_2m"],
    };
    extraWeatherInfo: { [key: string]: any };

    constructor() {
        this.extraWeatherInfo = extraWeatherInfo;
    }

    async getWeatherData(locations: Locations) {
        // Map each location to a promise of its weather data
        const weatherPromises = locations.locations.map((location) =>
            this.getWeatherDataForLocation(location)
        );

        // Wait for all weather data to be fetched
        const weatherDataArray = await Promise.all(weatherPromises);

        return this.convertArrayToObject(weatherDataArray, locations);
    }

    private convertArrayToObject(
        weatherDataArray: any[],
        locations: Locations
    ) {
        // Convert array to object keyed by location ID
        return weatherDataArray.reduce((acc, weatherData, index) => {
            const locationId = locations.locations[index].id;
            acc[locationId] = weatherData;
            return acc;
        }, {} as { [key: number]: any });
    }
    private async getWeatherDataForLocation(location: Location) {
        // params for openmeteo api
        const params = {
            latitude: location.latitude,
            longitude: location.longitude,
            daily: this.defaultFields.daily,
            hourly: this.defaultFields.hourly,
            current: this.defaultFields.current,
            timezone: this.timezone,
            models: this.models,
        };
        this.addExtraFields(params, location.activities);
        const url = settings.api.forecastUrl;
        const responses = await fetchWeatherApi(url, params);
        const locationData = this.mapWeatherData(responses, params);
        return locationData;
    }
    private get models() {
        return settings.api.models[0];
    }
    private get timezone() {
        return settings.api.timezone;
    }

    private addExtraFields(
        params: { [key: string]: any },
        activities: Array<string>
    ) {
        for (const activity of activities) {
            for (const timeFrame of ["hourly", "daily", "current"] as const) {
                const info = this.extraWeatherInfo[activity]?.[timeFrame];
                if (info) {
                    for (const field of info) {
                        if (!params[timeFrame].includes(field)) {
                            params[timeFrame].push(field);
                        }
                    }
                }
            }
        }
    }
    private mapWeatherData(responses: any, params: { [key: string]: any }) {
        // Map api fields to report fields
        return params;
    }
}
