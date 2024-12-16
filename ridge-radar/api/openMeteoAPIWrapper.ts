import { OpenMeteoAPI } from "./openMeteoAPI";
import { Locations } from "../types/locations";
import { Location } from "../types/locations";

export class OpenMeteoAPIWrapper {
    openMeteoAPI: OpenMeteoAPI;
    locations: Locations;
    weatherData: any;

    constructor(locations: Locations) {
        this.locations = locations;
        this.openMeteoAPI = new OpenMeteoAPI();
    }

    async getWeatherData() {
        this.weatherData = await this.openMeteoAPI.getWeatherData(this.locations);
    }
    getDayTemperature(location: Location, dayIndex: number) {
        return ;
    }
    getDaySunDuration(location: Location, dayIndex: number) {
        return ;
    }
    getDaySunPercentage(location: Location, dayIndex: number) {
        return ;
    }
    getDayPrecipitation(location: Location, dayIndex: number) {
        return ;
    }
    getDaySnowfall(location: Location, dayIndex: number) {
        return ;
    }
}
