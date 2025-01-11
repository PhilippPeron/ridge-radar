export interface dailyData {
    temperature: {
        min: number;
        max: number;
        unit: string;
    };
    sunDuration: number;
    sunPercentage: number;
    precipitation: {
        value: number;
        unit: string;
    };
    snowfall: {
        value: number;
        unit: string;
    };
    uvIndex: number;
    snowdepth: {
        value: number;
        unit: string;
    };
    precipitationHours: number;
    maxWindSpeed: {
        value: number;
        unit: string;
    };
    precipitationProbability: number;
    activitiesGood: string[];
    activitiesAcceptable: string[];
    activityWeather: {
        [key: string]: { [key: string]: any };
    };
    nightEnd: string;
    sunrise: string;
    goldenHourEnd: string;
    solarNoon: string;
    goldenHourStart: string;
    sunset: string;
    nightStart: string;
    moonrise: string;
    moonset: string;
    moonFraction: number;
}
