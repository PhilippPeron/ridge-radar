import { Activities } from "../types/activities";
import { Location } from "../types/locations";

export class activityProcessor {
    activities: Activities;
    
    constructor(activities: Activities) {
        this.activities = activities;
    }

    getDayWeather(location: Location, dayIndex: number) {
        return {}; //TODO: Implement this
    }

    getActivitiesGood(activityWeather: any) {
        return []; //TODO: Implement this
    }

    getActivitiesAcceptable(activityWeather: any) {
        return []; //TODO: Implement this
    }
}
