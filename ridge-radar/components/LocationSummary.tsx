import React from "react";
import { View, Text, FlatList, TouchableOpacity, Pressable } from "react-native";
import { useWeatherStore } from "../lib/store"; // Import the Zustand store
import LocationSummaryDay from "./LocationSummaryDay";
import EditIcon from "../assets/icons/pencil.svg";
import tailwindConfig from "@/tailwind.config";
import { useRouter } from "expo-router";

interface LocationSummaryProps {
    locId: string;
}

const LocationSummary: React.FC<LocationSummaryProps> = ({ locId }) => {
    const router = useRouter();
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
        <Pressable className="bg-primary/30 rounded-3xl px-5 pt-3 pb-1" onPress={() => router.push(`/day/${locId}?dayIndex=0`)}>
            <View className="flex-row justify-between items-center">
                <Text className="text-2xl">{name}</Text>
                <TouchableOpacity className="bg-primary/15 justify-center ml-auto rounded-full items-center">
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
                className="mt-2"
                showsHorizontalScrollIndicator={false}
            />
        </Pressable>
    );
};

export default LocationSummary;
