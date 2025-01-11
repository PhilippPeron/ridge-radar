import React from "react";
import {
    View,
    Text,
    Pressable,
} from "react-native";
import { useWeatherStore } from "../lib/store"; // Import the Zustand store
import { getIcon } from "../lib/weatherIcons"; // Import the getIcon function
import { useRouter } from "expo-router";


const LocationSummaryDay: React.FC<{ dayIndex: number, locId: string, isSelected?: boolean}> = ({ dayIndex, locId, isSelected }) => {
    const router = useRouter();
    const day = useWeatherStore((state) => state.wReportGen.wReport.locations[locId].weather.days[dayIndex]);
    const WeatherIcon = getIcon(day.daily.weatherCode, false);
    const isSelectedMods = isSelected ? "bg-primary/15" : "bg-primary/0";
    return (
        <Pressable className={`mr-1 w-24 px-1 py-2 rounded-3xl ${isSelectedMods}`} onPress={() => router.push(`/day/${locId}?dayIndex=${dayIndex}`)}>
            <View className="items-center">
                <Text className="dark:text-text-dark">{day.title}</Text>
                <WeatherIcon width={50} height={50}/>
                <Text className="dark:text-text-dark">{day.daily.temperature.max.toFixed(0)}°/{day.daily.temperature.min.toFixed(0)}°</Text>
                <SunDurationPill sunDuration={day.daily.sunDuration} sunPercentage={day.daily.sunPercentage} />
                <SnowRainPill snow={day.daily.snowfall.value} rain={day.daily.precipitation.value} />
            </View>
        </Pressable>
    );
};

export default LocationSummaryDay;


const SunDurationPill: React.FC<{ sunDuration: number, sunPercentage: number }> = ({ sunDuration, sunPercentage }) => {
    const backgroundColor = `rgba(255, 255, 0, ${sunPercentage})`; // Calculate the background color based on sunPercentage
    return (
        <View style={{ backgroundColor }} className="rounded-3xl w-full px-2 items-center m-1">
            <Text className="w-full text-center dark:text-gray-100">{sunDuration.toFixed()}h</Text>
        </View>
    );
}

const SnowRainPill: React.FC<{ snow: number, rain: number }> = ({ snow, rain }) => {
    let backgroundColor = "transparent";
    let text = "-";
    if (rain >= 1){
        const opacity = Math.min(rain / 10, 1); // Calculate opacity based on rain value
        backgroundColor = `rgba(0, 191, 255, ${opacity})`;
        text = `${rain.toFixed(0)}mm`;
    }
    if (snow >= 1 && rain <= 1) {
        backgroundColor = "white";
        text = `${snow.toFixed(0)}cm`;
    }

    return (
        <View style={{ backgroundColor }} className="w-full rounded-3xl px-2 items-center my-1">
            <Text className="w-full text-center dark:text-gray-700">{text}</Text>
        </View>
    );
};