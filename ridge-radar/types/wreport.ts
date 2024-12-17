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
    activitiesGood: string[];
    activitiesAcceptable: string[];
    activityWeather: {
        [key: string]: { [key: string]: any };
    };
}
