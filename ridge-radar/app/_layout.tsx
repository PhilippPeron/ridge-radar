import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { hideNavBar } from "../lib/helpers";
import { loadData } from "../lib/loadData";
import { useWeatherStore } from "../lib/store"; // Import the Zustand store
import "../global.css";

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

    useEffect(() => {
        if (error) throw error;
        if (fontsLoaded) SplashScreen.hideAsync();
        hideNavBar();
        // Fetch data and build the wreport
        const fetchData = async () => {
            const wReportGen = await loadData();
            setWeatherData(wReportGen); // Store data in Zustand
            setDataLoaded(true); // Set data loaded to true
        };
        fetchData();
    }, [fontsLoaded, error]);

    if (!fontsLoaded || !dataLoaded) {
      console.log('Loading...');
      return null;
    }

    return (
        <>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
            <StatusBar hidden />
        </>
    );
}
