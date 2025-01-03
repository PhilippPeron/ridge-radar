import * as NavigationBar from 'expo-navigation-bar';
import { LogBox, Appearance  } from "react-native";
import { colorScheme } from "nativewind";
import { globalSettings } from "../lib/globals";
import { DarkTheme, DefaultTheme  } from "@react-navigation/native";

LogBox.ignoreLogs(['"[object Object]" is not a valid color or brush [Component Stack]']);

export function hideNavBar() {
    NavigationBar.setVisibilityAsync('visible');
    NavigationBar.setPositionAsync("absolute");
    NavigationBar.setBackgroundColorAsync("#ffffff01");
}

export function useAppColorScheme() {
    
    const systemScheme = Appearance.getColorScheme();
    console.log("System scheme: ", systemScheme);
    let theme: any;
    switch (globalSettings.theme) {
        case "dark":
            theme = DarkTheme;
            colorScheme.set("dark");
            break;
        case "system":
            theme = systemScheme === "dark" ? DarkTheme : DefaultTheme;
            colorScheme.set("system");
            break;
        default:
            colorScheme.set("light");
            theme = DefaultTheme;
    }
    return theme;
}