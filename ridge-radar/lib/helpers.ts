import * as NavigationBar from "expo-navigation-bar";
import { LogBox, Appearance } from "react-native";

LogBox.ignoreLogs([
    '"[object Object]" is not a valid color or brush [Component Stack]',
]);

export function hideNavBar() {
    NavigationBar.setVisibilityAsync("visible");
    NavigationBar.setPositionAsync("absolute");
    NavigationBar.setBackgroundColorAsync("#ffffff01");
}
