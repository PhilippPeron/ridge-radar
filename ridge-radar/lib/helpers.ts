import * as NavigationBar from "expo-navigation-bar";
import { LogBox } from "react-native";
import { Location } from "../types/locations";

LogBox.ignoreLogs([
    '"[object Object]" is not a valid color or brush [Component Stack]',
]);

export function hideNavBar() {
    NavigationBar.setVisibilityAsync("visible");
    NavigationBar.setPositionAsync("absolute");
    NavigationBar.setBackgroundColorAsync("#ffffff01");
}

export function getTagList(locations: Location[]) {
    let tags: string[] = [];
    locations.forEach((location) => {
        location.tags.forEach((tag: string) => {
            if (!tags.includes(tag)) {
                tags.push(tag);
            }
        });
    });
    return tags;
}
