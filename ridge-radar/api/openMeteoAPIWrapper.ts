import { OpenMeteoAPI } from "./openMeteoAPI";
import { Locations } from "../types/locations";

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
    getDayTemperature(location, dayIndex) {
        return ;
    }
    getDaySunDuration(location, dayIndex) {
        return ;
    }
    getDaySunPercentage(location, dayIndex) {
        return ;
    }
    getDayPrecipitation(location, dayIndex) {
        return ;
    }
    getDaySnowfall(location, dayIndex) {
        return ;
    }
}
