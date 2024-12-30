import DataStore from "./dataStore";
import defaultSettings from '../data/defaultSettings.json';
import defaultActivities from '../data/defaultActivities.json';
import defaultLocations from '../data/defaultLocations.json';

import AsyncStorage from "@react-native-async-storage/async-storage";

abstract class DataStore {
    abstract storageKey: string;
    abstract defaultJSON: { [key: string]: any };
    value: { [key: string]: any };
    constructor() {
        this.loadFromStorage = this.loadFromStorage.bind(this);
        this.saveToStorage = this.saveToStorage.bind(this);
        this.setDefaultIfEmpty = this.setDefaultIfEmpty.bind(this);
        this.value = this.loadFromStorage();
        this.setDefaultIfEmpty();
    }

    async loadFromStorage(): Promise<{ [key: string]: any } | null> {
        console.log("DataStore: getJSON", this.storageKey);
        const value = await AsyncStorage.getItem(this.storageKey);
        this.value = value ? JSON.parse(value) : null;
        return this.value;
    }

    async saveToStorage(): Promise<void> {
        console.log("DataStore ", this.storageKey, ": saving");
        await AsyncStorage.setItem(this.storageKey, JSON.stringify(this.value));
        return;
    }

    private async setDefaultIfEmpty(): Promise<void> {
        if (this.value === null) {
            console.log(
                "DataStore ",
                this.storageKey,
                ": empty, setting default value"
            );
            this.value = this.defaultJSON;
            await this.saveToStorage();
        }
    }
}

class Settings extends DataStore {
    storageKey = "settings";
    defaultJSON = defaultSettings;
}


let globalSettings = new Settings();
let globalActivities = new Activities();
let globalLocations = new Locations();

export { globalSettings, globalActivities, globalLocations, globalVariableHandler };