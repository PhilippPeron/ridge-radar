export interface weatherDataForLocation {
    current: {
        time: string;
        temperature_2m: number;
    };
    hourly: {
        time: Date[];
        temperature_2m: number[];
        precipitation_probability: number[];
        precipitation: number[];
        snowfall: number[];
        snow_depth: number[];
        weather_code: number[];
        visibility: number[];
        sunshine_duration: number[];
        is_day: boolean[];
    };
    daily: {
        time: string;
        weather_code: { [key: string]: number };
        temperature_2m_max: { [key: string]: number };
        temperature_2m_min: { [key: string]: number };
        sunrise: string[];
        sunset: string[];
        daylight_duration: { [key: string]: number };
        sunshine_duration: { [key: string]: number };
        uv_index_max: { [key: string]: number };
        precipitation_sum: { [key: string]: number };
        rain_sum: { [key: string]: number };
        showers_sum: { [key: string]: number };
        snowfall_sum: { [key: string]: number };
        precipitation_hours: { [key: string]: number };
        precipitation_probability_max: { [key: string]: number };
        wind_speed_10m_max: { [key: string]: number };
    };
}


export interface weatherData {
    [key: number]: weatherDataForLocation;
}