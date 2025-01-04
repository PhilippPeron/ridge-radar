import React from "react";
import { View, Text, Pressable } from "react-native";
import { useWeatherStore } from "../lib/store";
import { getIcon } from "../lib/weatherIcons"; // Import the getIcon function
import { useRouter } from "expo-router";

const DetailsHourlyHour: React.FC<{
    arrayIndex: number;
    hour: number;
    dayIndex: string;
    locId: string;
    isSelected?: boolean;
}> = ({ arrayIndex, hour, dayIndex, locId, isSelected }) => {
    const router = useRouter();
    const hourly = useWeatherStore(
        (state) =>
            state.wReportGen.wReport.locations[locId].weather.days[dayIndex]
                .hourly
    );
    const isNight = !hourly.isDay[hour];
    const WeatherIcon = getIcon(hourly.weatherCode[hour], isNight);
    const precipitationProbability = hourly.precipitationProbability[hour];
    const isNow = (dayIndex == "0" && arrayIndex == 0);
    return (
        <View className="items-center">
            <WeatherIcon width={25} height={25} />
            <Text className="text-sm m-1">{hourly.temperature[hour].toFixed(0)}°</Text>
            <Text className="text-sm my-1">{hourly.precipitation[hour].toFixed(1)}</Text>
            <Text className="text-sm my-1">{precipitationProbability}%</Text>
            <TimePill
                sunDuration={hourly.sunshineDuration[hour]}
                hour={hour}
                isNow={isNow}
            />
        </View>
    );
};

export default DetailsHourlyHour;

const TimePill: React.FC<{
    sunDuration: number;
    hour: number;
    isNow: boolean;
}> = ({ sunDuration, hour, isNow }) => {
    const sunPercentage = sunDuration / 3600;
    const backgroundColor = `rgba(255, 255, 0, ${sunPercentage})`; // Calculate the background color based on sunPercentage
    const hourText = isNow ? "Jetzt" : `${hour}:00`;
    return (
        <View
            style={{ backgroundColor }}
            className="w-full rounded-full px-1 items-center m-1"
        >
            <View className="flex-row items-center">
                <Text className="text-black text-center text-sm">
                    {hourText}
                </Text>
            </View>
        </View>
    );
};
