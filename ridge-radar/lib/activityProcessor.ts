import { Activities } from "../types/activities";
import { Location } from "../types/locations";
import { globalLocations } from "./globals";

export class activityProcessor {
    activities: Activities;

    constructor(activities: Activities) {
        this.activities = activities;
    }

    getDayWeather(location: Location, day: any) {
        const activityDayWeather = {};
        for (const activity of location.activities) {
            const activityDefinition = this.activities.activities[activity];
            const criteriaNames = Object.keys(activityDefinition.weather);
            const defaultHours = activityDefinition.default_hours;
            activityDayWeather[activity] = {};
            for (const criteriaName of criteriaNames) {
                const criteria = activityDefinition.weather[criteriaName];
                const hours = "hours" in Object.keys(criteria) ? criteria.hours : defaultHours
                
            }
        }
        return activityDayWeather //TODO: Implement this
    }

    getActivityStatus(location, activityWeather: any) {
        const goodActivities: string[] = this.checkConditions(
            location,
            activityWeather,
            "good",
            []
        );
        const acceptableActivities: string[] = this.checkConditions(
            location,
            activityWeather,
            "acceptable",
            goodActivities
        );
        return { goodActivities, acceptableActivities };
    }
    private checkConditions(
        location: Location,
        activityWeather: any,
        mode: string,
        activitiesToIgnore: string[]
    ) {
        for (const activity of location.activities) {
            if (activity in activitiesToIgnore) {
                continue;
            } // TODO: Check Syntax
            const activityDefinition = this.activities.activities[activity];
            const criteriaNames = Object.keys(activityDefinition.weather);
            for (const criteriaName of criteriaNames) {
                const criteria = activityDefinition.weather[criteriaName];
                const condition = activityWeather[criteriaName];
                this.checkCondition(criteriaName, condition, criteria);
            }
        }
        return [];
    }
    private checkCondition(criteriaName, condition, criteria) {
        // Check if ending is _hour or _day
        if ("_hour") {
            // Check all values between min and max
        }
    }
}
