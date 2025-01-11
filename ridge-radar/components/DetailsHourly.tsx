import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useWeatherStore } from "../lib/store"; // Import the Zustand store
import DetailsHourlyHour from "./DetailsHourlyHour";
import tailwindConfig from "@/tailwind.config";
import { DateTime } from "luxon";

interface DetailsHourlyProps {
    locId: string;
    dayIndex: string;
}

const DetailsHourly: React.FC<DetailsHourlyProps> = ({ locId, dayIndex }) => {
    const tailwindColors = tailwindConfig?.theme?.extend?.colors;
    const location = useWeatherStore(
        (state) => state.wReportGen.wReport.locations[locId]
    );

    const [hoursArray, setHoursArray] = useState<number[]>([]);

    useEffect(() => {
        if (location) {
            const timezone = location.timezone;
            const currentHour =
                dayIndex == "0"
                    ? DateTime.now().setZone(location.timezone).hour
                    : 0;
            const newHoursArray = Array.from(
                { length: 24 - currentHour },
                (_, i) => currentHour + i
            );
            setHoursArray(newHoursArray);
        }
    }, [location, dayIndex]);

    if (!location) {
        return (
            <View className="bg-black rounded-full">
                <Text>Location not found</Text>
            </View>
        );
    }

    return (
        <View className="w-full flex-row">
            <View className="w-15 mt-2">
                <Text className="text-sm my-1">Icon</Text>
                <Text className="text-sm my-1">Temp</Text>
                <Text className="text-sm my-1">Rain</Text>
                <Text className="text-sm my-1">Prob</Text>
                <Text className="text-sm my-1">Time</Text>
            </View>

            <View className="flex-1 ml-1">
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className="mt-2"
                >
                    {hoursArray.map((hour) => (
                        <View key={hour} className="mr-2">
                            <DetailsHourlyHour
                                arrayIndex={hoursArray.indexOf(hour)}
                                hour={hour}
                                dayIndex={dayIndex}
                                locId={locId}
                            />
                        </View>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
};

export default DetailsHourly;
