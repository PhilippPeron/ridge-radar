import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useWeatherStore } from "../lib/store"; // Import the Zustand store
import LocationSummaryDay from "./LocationSummaryDay";
import EditIcon from "../assets/icons/pencil.svg";
import tailwindConfig from "@/tailwind.config";

interface LocationSummaryProps {
    locId: string;
}

const LocationSummary: React.FC<LocationSummaryProps> = ({ locId }) => {
    const tailwindColors = tailwindConfig?.theme?.extend?.colors;
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
        <View className="bg-primary/40 rounded-3xl px-5 py-3">
            <View className="flex-row justify-between items-center">
                <Text className="text-2xl">{name}</Text>
                <TouchableOpacity className="bg-primary/20 justify-center ml-auto rounded-full items-center">
                    <EditIcon width={27} height={27} fill={tailwindColors?.text} />
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
