import { Activities } from "../types/activities";
import { Location } from "../types/locations";

export class activityProcessor {
    activities: Activities;
    
    constructor(activities: Activities) {
        this.activities = activities;
    }

    getDayWeather(location: Location, dayIndex: number) {
        return ;
    }

    getActivitiesGood(activityWeather: any) {
        return ;
    }

    getActivitiesAcceptable(activityWeather: any) {
        return ;
    }
}
