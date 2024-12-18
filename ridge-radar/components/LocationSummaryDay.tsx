import React from "react";
import {
    View,
    Text,
    TouchableWithoutFeedback,
} from "react-native";
import { useWeatherStore } from "../lib/store"; // Import the Zustand store
import Logo from "../assets/icons/pencil.svg";


const LocationSummaryDay: React.FC<{ dayIndex: number, locId: string }> = ({ dayIndex, locId }) => {
    const day = useWeatherStore((state) => state.wReportGen.wReport.locations[locId].weather.days[dayIndex]);
    return (
        <TouchableWithoutFeedback className="mr-4">
            <View className="items-center">
                <Text>{day.title}</Text>
                <Logo width={80} height={80} fill={"#000"} style={{ marginVertical: -10 }} />
                <Text>{day.daily.temperature.max.toFixed(0)}°/{day.daily.temperature.min.toFixed(0)}°</Text>
                <SunDurationPill sunDuration={day.daily.sunDuration} sunPercentage={day.daily.sunPercentage} />
            </View>
        </TouchableWithoutFeedback>
    );
};

export default LocationSummaryDay;


const SunDurationPill: React.FC<{ sunDuration: number, sunPercentage: number }> = ({ sunDuration, sunPercentage }) => {
    const backgroundColor = `rgba(255, 255, 0, ${sunPercentage})`; // Calculate the background color based on sunPercentage
    return (
        <View style={{ backgroundColor }} className="rounded-full px-2">
            <Text className="text-black w-fit">{sunDuration.toFixed()}h</Text>
        </View>
    );
}