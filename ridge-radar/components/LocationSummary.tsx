import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useWeatherStore } from "../lib/store"; // Import the Zustand store

interface LocationSummaryProps {
    locationId: string;
}

const LocationSummary: React.FC<LocationSummaryProps> = ({ locationId }) => {
    const location = useWeatherStore(
        (state) => state.wReportGen.wReport.locations[locationId]
    );

    if (!location) {
        return (
            <View>
                <Text>Location not found</Text>
            </View>
        );
    }

    const { name, elevation, weather } = location;
    const todayWeather = weather.days[0].daily;

    return (
        <View style={styles.container}>
            <Text style={styles.name}>{name}</Text>
            <Text>{elevation}m</Text>
            <Text>
                Temperature: {todayWeather.temperature.min}°C -{" "}
                {todayWeather.temperature.max}°C
            </Text>
            <Text>
                Precipitation: {todayWeather.precipitation.value}
                {todayWeather.precipitation.unit}
            </Text>
            {/* ...additional weather details... */}
        </View>
    );
};

const styles = StyleSheet.create({
    // ...styles for the component...
});

export default LocationSummary;
