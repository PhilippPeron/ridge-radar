import defaultSettings from '../data/defaultSettings.json';
import defaultActivities from '../data/defaultActivities.json';
import defaultLocations from '../data/defaultLocations.json';
import { Locations } from "../types/locations";
import { Activities } from "../types/activities";

import AsyncStorage from "@react-native-async-storage/async-storage";

class DataStore {
    alwaysLoadDefault: boolean = true; // TODO: Set to true for development, false for production

    async loadFromStorage(key:string): Promise<{ [key: string]: any }> {
        console.log("DataStore: Loading", key);
        const value = await AsyncStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    }

    async loadFromStorageWithDefault(key:string, defaultValue: { [key: string]: any }): Promise<{ [key: string]: any }> {
        const value = await this.loadFromStorage(key)
        if (value === null || this.alwaysLoadDefault) {
            console.log("DataStore: empty, setting default value for ", key);
            await this.saveToStorage(key, defaultValue);
            return this.loadFromStorage(key);
        }
        return value;
    }

    async saveToStorage(key:string, value: { [key: string]: any }): Promise<void> {
        console.log("DataStore: saving into ", key);
        await AsyncStorage.setItem(key, JSON.stringify(value));
        return;
    }
}

const dataStorer = new DataStore();

let debugFlag = false;

// Use mutable objects so we can update them asynchronously without using `await`.
let globalSettings: { [key: string]: any } = { ...defaultSettings };
dataStorer.loadFromStorageWithDefault("settings", defaultSettings).then((result) => {
  Object.assign(globalSettings, result);
});

let globalActivities: Activities = { ...defaultActivities };
dataStorer.loadFromStorageWithDefault("activities", defaultActivities).then((result) => {
  Object.assign(globalActivities, result);
});

let globalLocations: Locations = { ...defaultLocations };
dataStorer.loadFromStorageWithDefault("locations", defaultLocations).then((result) => {
  Object.assign(globalLocations, result);
});

export { globalSettings, globalActivities, globalLocations, dataStorer, debugFlag };