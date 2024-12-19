import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useWeatherStore } from "../lib/store"; // Import the Zustand store
import LocationSummaryDay from "./LocationSummaryDay";

interface LocationSummaryProps {
    locId: string;
}

const LocationSummary: React.FC<LocationSummaryProps> = ({ locId }) => {
    const location = useWeatherStore(
        (state) => state.wReportGen.wReport.locations[locId]
    );

    if (!location) {
        return (
            <View className="bg-black rounded-full">
                <Text>Location not found</Text>
            </View>
        );
    }

    const { name, elevation, weather } = location;

    return (
        <View className="bg-primary/60 rounded-3xl px-4 py-2">
            <View className="flex-row justify-between items-center">
                <Text className="text-2xl">{name}</Text>
                <TouchableOpacity className="bg-primary/40 justify-center ml-auto rounded-full w-11 items-center">
                    <Text className="">Edit</Text>
                </TouchableOpacity>
            </View>
            <Text className="text-base">{elevation}m</Text>
            <FlatList
                horizontal
                data={weather.days}
                renderItem={({ index }) => (
                    <LocationSummaryDay dayIndex={index} locId={locId} />
                )}
                keyExtractor={(item, index) => index.toString()}
                className="mt-4"
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

export default LocationSummary;
