import React from "react";
import { View, Text, FlatList, TouchableOpacity, Pressable } from "react-native";
import { useWeatherStore } from "../lib/store"; // Import the Zustand store
import LocationSummaryDay from "./LocationSummaryDay";
import EditIcon from "../assets/icons/pencil.svg";
import tailwindConfig from "@/tailwind.config";
import { useRouter } from "expo-router";
import { useColorScheme } from "react-native";

interface LocationSummaryProps {
    locId: string;
}

const LocationSummary: React.FC<LocationSummaryProps> = ({ locId }) => {
    const router = useRouter();
    const tailwindColors = tailwindConfig?.theme?.extend?.colors;
    const location = useWeatherStore(
        (state) => state.wReportGen.wReport.locations[locId]
    );
    
    const colorScheme = useColorScheme();
    const textColor = colorScheme === 'dark' ? tailwindColors?.text.dark : tailwindColors?.text.DEFAULT;
    
    if (!location) {
        return (
            <View className="bg-red-500 rounded-full">
                <Text>Location not found</Text>
            </View>
        );
    }
    const { display_name, elevation, weather } = location;
    
    return (
        <Pressable className="bg-primary/15 dark:bg-primary-dark/40 rounded-3xl px-5 pt-3 pb-1" onPress={() => router.push(`/day/${locId}?dayIndex=0`)}>
            <View className="flex-row justify-between items-center">
                <Text className="text-2xl dark:text-text-dark">{display_name}</Text>
                <TouchableOpacity className="bg-primary/15 dark:bg-primary-dark/30 justify-center ml-auto rounded-full items-center" onPress={() => router.push({ pathname: "/modalLocEditor", params: { locId } })}>
                    <EditIcon width={27} height={27} fill={textColor} />
                </TouchableOpacity>
            </View>
            <Text className="text-base dark:text-text-dark mt-1">{elevation}m</Text>
            <FlatList
                horizontal
                data={weather.days}
                renderItem={({ index }) => (
                    <LocationSummaryDay dayIndex={index} locId={locId} />
                )}
                keyExtractor={(item, index) => index.toString()}
                className=""
                showsHorizontalScrollIndicator={false}
            />
        </Pressable>
    );
};

export default LocationSummary;
