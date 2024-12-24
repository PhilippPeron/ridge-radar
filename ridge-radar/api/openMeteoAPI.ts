import { Locations, Location } from "../types/locations";
import { fetchWeatherApi } from "openmeteo";
import { WeatherApiResponse } from "@openmeteo/sdk/weather-api-response";
import settings from "../lib/settings";
// import * as fs from "fs";

const extraWeatherInfo = {
    gliding: {
        daily: [],
        hourly: ["wind_speed_400m", "wind_speed_800m", "wind_speed_1200m"],
        current: [],
    }, // example
};

export class OpenMeteoAPI {
    defaultFields = {
        daily: [
            "weather_code",
            "temperature_2m_max",
            "temperature_2m_min",
            "sunrise",
            "sunset",
            "daylight_duration",
            "sunshine_duration",
            "uv_index_max",
            "precipitation_sum",
            "rain_sum",
            "showers_sum",
            "snowfall_sum",
            "precipitation_hours",
            "precipitation_probability_max",
            "wind_speed_10m_max",
        ],
        hourly: [
            "temperature_2m",
            "precipitation_probability",
            "precipitation",
            "snowfall",
            "snow_depth",
            "weather_code",
            "visibility",
            "sunshine_duration",
            "is_day",
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
        const locationData = this.mapWeatherData(responses, params);let outputPath = "./data/examples/weatherData-output.json";
        
        // fs.writeFileSync(outputPath, JSON.stringify(locationData, null, 2), "utf-8");
        // console.log(`WeatherData for ${location.name} written to ${outputPath}`);

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
    private mapWeatherData(
        responses: WeatherApiResponse[],
        params: { [key: string]: any }
    ) {
        // Map api fields to report fields
        // https://open-meteo.com/en/docs#current=temperature_2m&hourly=temperature_2m,rain,snowfall,snow_depth,weather_code,cloud_cover&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,daylight_duration,sunshine_duration,precipitation_sum,rain_sum,snowfall_sum&timezone=Europe%2FBerlin&models=best_match
        const range = (start: number, stop: number, step: number) =>
            Array.from(
                { length: (stop - start) / step },
                (_, i) => start + i * step
            );
        const response = responses[0];
        const utcOffsetSeconds = response.utcOffsetSeconds();

        const current = response.current()!;
        const hourly = response.hourly()!;
        const daily = response.daily()!;

        // Note: The order of weather variables in the URL query and the indices below need to match!
        const weatherData: { [key: string]: any } = {
            current: {
                time: new Date(
                    (Number(current.time()) + utcOffsetSeconds) * 1000
                ),
            },
            hourly: {
                time: range(
                    Number(hourly.time()),
                    Number(hourly.timeEnd()),
                    hourly.interval()
                ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
            },
            daily: {
                time: range(
                    Number(daily.time()),
                    Number(daily.timeEnd()),
                    daily.interval()
                ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
            },
        };
        const timeFrames = ["current", "hourly", "daily"] as const;
        timeFrames.forEach((timeFrame) => {
            params[timeFrame].forEach((variable: string, index: number) => {
                if (timeFrame === "current") {
                    weatherData[timeFrame][variable] = current
                        .variables(index)!
                        .value();
                } else if (timeFrame === "hourly") {
                    weatherData[timeFrame][variable] = hourly
                        .variables(index)!
                        .valuesArray();
                } else if (timeFrame === "daily") {
                    if (variable === "sunrise" || variable === "sunset") {
                        // Sunrise and sunset are encoded as int64 timestamps
                        // They first need to be converted to Date objects and then to strings
                        const valuesLength = daily
                            .variables(index)!
                            .valuesInt64Length();
                        weatherData[timeFrame][variable] = [];
                        for (let i = 0; i < valuesLength; i++) {
                            const bigIntValue = daily
                                .variables(index)!
                                .valuesInt64(i);
                            const timestamp = Number(bigIntValue);
                            const date = new Date(
                                (timestamp + utcOffsetSeconds) * 1000
                            );
                            weatherData[timeFrame][variable].push(
                                date.toISOString()
                            );
                        }
                    } else {
                        weatherData[timeFrame][variable] = daily
                            .variables(index)!
                            .valuesArray();
                    }
                }
            });
        });
        return weatherData;
    }
}
