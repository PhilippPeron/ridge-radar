import React from "react";
import { SplashScreen, Stack } from "expo-router";
import { ThemeProvider, DarkTheme, DefaultTheme  } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { hideNavBar } from "../lib/helpers";
import { loadData } from "../lib/loadData";
import { useWeatherStore } from "../lib/store"; // Import the Zustand store
import { useColorScheme, Alert } from "react-native";
import "../global.css";
import { globalSettings } from "../lib/globals";
import { colorScheme } from "nativewind";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
    const [fontsLoaded, error] = useFonts({
        "Roboto-Black": require("../assets/fonts/Roboto-Black.ttf"),
        "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
        "Roboto-Light": require("../assets/fonts/Roboto-Light.ttf"),
        "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
        "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
        "Roboto-Thin": require("../assets/fonts/Roboto-Thin.ttf"),
    });

    const setWeatherData = useWeatherStore((state) => state.setWeatherData);
    const [dataLoaded, setDataLoaded] = useState(false);
    const systemScheme = useColorScheme();

    useEffect(() => {
        if (error) throw error;
        if (fontsLoaded && dataLoaded) SplashScreen.hideAsync();
        hideNavBar();
    }, [fontsLoaded, error, dataLoaded]);

    useEffect(() => {
        const fetchData = async () => {
            const timeout = new Promise((resolve) => setTimeout(resolve, 4000));
            const wReportGen = await Promise.race([loadData(), timeout]);
            if (wReportGen) {
                setWeatherData(wReportGen);
                setDataLoaded(true);
                console.log("Data loaded");
            } else {
                console.error("Timeout - Data not loaded");
                Alert.alert("Error", "Data timeout - Please restart the app");
            }
        };
        fetchData();
    }, []);

    if (!fontsLoaded || !dataLoaded) {
        console.log("Loading...");
        return null;
    }
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
    return (
        <ThemeProvider value={theme}>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar translucent />
        </ThemeProvider>
    );
}
