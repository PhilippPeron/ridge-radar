import React from "react";
import { View, Text, Pressable } from "react-native";
import { useWeatherStore } from "../lib/store"; // Import the Zustand store
import { getIcon } from "../lib/weatherIcons"; // Import the getIcon function
import { useRouter } from "expo-router";

const DetailsHourlyHour: React.FC<{
    hourIndex: number;
    dayIndex: string;
    locId: string;
    isSelected?: boolean;
}> = ({ hourIndex, dayIndex, locId, isSelected }) => {
    const router = useRouter();
    const hourly = useWeatherStore(
        (state) =>
            state.wReportGen.wReport.locations[locId].weather.days[dayIndex]
                .hourly
    );
    const WeatherIcon = getIcon(hourly.weatherCode[hourIndex], false);
    const precipitationProbability = hourly.precipitationProbability[hourIndex];
    const isNow = (dayIndex == "0" && hourIndex == new Date().getHours());
    return (
        <View className="items-center">
            <WeatherIcon width={25} height={25} />
            <Text>{hourly.precipitation[hourIndex].toFixed(1)}</Text>
            <Text>{precipitationProbability}%</Text>
            <TimePill
                sunDuration={hourly.sunshineDuration[hourIndex]}
                time={hourly.time[hourIndex]}
                isNow={isNow}
            />
        </View>
    );
};

export default DetailsHourlyHour;

const TimePill: React.FC<{
    sunDuration: number;
    time: Date;
    isNow: boolean;
}> = ({ sunDuration, time, isNow }) => {
    const sunPercentage = sunDuration / 3600;
    const backgroundColor = `rgba(255, 255, 0, ${sunPercentage})`; // Calculate the background color based on sunPercentage
    const timeText = isNow ? "Jetzt" : time.getHours() + ":00";
    return (
        <View
            style={{ backgroundColor }}
            className="w-full rounded-full px-2 items-center m-1"
        >
            <Text className="text-black w-full text-center">
                {timeText}
            </Text>
        </View>
    );
};
