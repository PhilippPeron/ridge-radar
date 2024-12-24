import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useWeatherStore } from "../lib/store"; // Import the Zustand store
import DetailsHourlyHour from "./DetailsHourlyHour";
import tailwindConfig from "@/tailwind.config";

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
    const currentHour = dayIndex == "0" ? new Date().getHours() : 0;
    const hoursArray = Array.from({ length: 24 - currentHour }, (_, i) => currentHour + i);

    return (
        <View className="bg-primary/30 rounded-3xl px-5 pt-3 pb-1">
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="mt-2"
            >
                {hoursArray.map((hour) => (
                    <DetailsHourlyHour
                        key={hour}
                        hourIndex={hour}
                        dayIndex={dayIndex}
                        locId={locId}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

export default DetailsHourly;
