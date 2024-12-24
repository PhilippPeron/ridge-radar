import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useWeatherStore } from "../lib/store"; // Import the Zustand store
import DetailsHourlyHour from "./DetailsHourlyHour";
import tailwindConfig from "@/tailwind.config";
import { ScrollView } from "react-native-gesture-handler";

interface DetailsHourlyProps {
    locId: string;
    dayIndex: string;
}

const DetailsHourly: React.FC<DetailsHourlyProps> = ({ locId, dayIndex }) => {
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
    const currentHour = new Date().getHours();
    console.log("currentHour", currentHour);
    const arrayLength = dayIndex == "0" ? 24 - currentHour : 24;
    const { name, elevation, weather } = location;

    return (
        <View className="bg-primary/30 rounded-3xl px-5 pt-3 pb-1">
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="mt-2"
            >
                {Array.from({ length: arrayLength }, (_, index) => (
                    <DetailsHourlyHour
                        key={index}
                        hourIndex={index}
                        dayIndex={dayIndex}
                        locId={locId}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

export default DetailsHourly;
