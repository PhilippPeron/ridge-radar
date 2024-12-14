export interface WeatherCondition {
    min: number;
    max: number;
    unit: string;
    and?: { [key: string]: string };
}

export interface HourlyWeatherCondition extends WeatherCondition {
    hours: number[];
}

export interface DailyWeatherCondition extends WeatherCondition {}

type WeatherConditionType = HourlyWeatherCondition | DailyWeatherCondition;

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