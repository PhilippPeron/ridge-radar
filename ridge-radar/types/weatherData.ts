export interface weatherDataForLocation {
    current: {
        time: string;
        temperature_2m: number;
    };
    hourly: {
        time: string[];
        temperature_2m: { [key: string]: number };
        rain: { [key: string]: number };
        snowfall: { [key: string]: number };
        snow_depth: { [key: string]: number };
        weather_code: { [key: string]: number };
        cloud_cover: { [key: string]: number };
    };
    daily: {
        time: string[];
        weather_code: { [key: string]: number };
        temperature_2m_max: { [key: string]: number };
        temperature_2m_min: { [key: string]: number };
        sunrise: string[];
        sunset: string[];
        daylight_duration: { [key: string]: number };
        sunshine_duration: { [key: string]: number };
        showers_sum: { [key: string]: number };
        rain_sum: { [key: string]: number };
        snowfall_sum: { [key: string]: number };
    };
}


export interface weatherData {
    [key: number]: weatherDataForLocation;
}