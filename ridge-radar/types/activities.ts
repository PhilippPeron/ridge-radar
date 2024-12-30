export interface WeatherCondition {
    min: number;
    max: number;
    unit: string;
    and?: { [key: string]: string };
}

export interface HourlyWeatherCondition {
    hours: number[];
    good: WeatherCondition;
    acceptable: WeatherCondition;
}

export interface DailyWeatherCondition {
    good: WeatherCondition;
    acceptable: WeatherCondition;
}

type WeatherConditionType = HourlyWeatherCondition | DailyWeatherCondition | WeatherCondition;

export interface ActivityWeather {
    [key: string]: WeatherConditionType;
}

export interface Activity {
    icon: string;
    display_name: string;
    description: string;
    weather: ActivityWeather;
}

export interface Activities {
    last_modified: string;
    format_version: number;
    units: string;
    activities: {
        [key: string]: Activity;
    };
}