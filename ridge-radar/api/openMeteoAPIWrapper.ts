import { OpenMeteoAPI } from "./openMeteoAPI";
import { Locations } from "../types/locations";

class OpenMeteoAPIWrapper {
    openMeteoAPI: OpenMeteoAPI;
    locations: Locations;

    constructor(locations: Locations) {
        this.locations = locations;
        this.openMeteoAPI = new OpenMeteoAPI();
    }

    async getWeatherData() {
        await this.openMeteoAPI.getWeatherData(this.locations);
    }
}
