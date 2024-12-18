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
                <SnowRainPill snow={day.daily.snowfall.value} rain={day.daily.precipitation.value} />
            </View>
        </TouchableWithoutFeedback>
    );
};

export default LocationSummaryDay;


const SunDurationPill: React.FC<{ sunDuration: number, sunPercentage: number }> = ({ sunDuration, sunPercentage }) => {
    const backgroundColor = `rgba(255, 255, 0, ${sunPercentage})`; // Calculate the background color based on sunPercentage
    return (
        <View style={{ backgroundColor }} className="bg- w-11/12 rounded-full px-2 items-center m-1">
            <Text className="text-black w-full text-center">{sunDuration.toFixed()}h</Text>
        </View>
    );
}

const SnowRainPill: React.FC<{ snow: number, rain: number }> = ({ snow, rain }) => {
    let backgroundColor = "transparent";
    let text = "-";
    if (rain >= 1){
        const opacity = Math.min(rain / 10, 1); // Calculate opacity based on rain value
        backgroundColor = `rgba(0, 191, 255, ${opacity})`;
        text = `${rain.toFixed(0)} mm`;
    }
    if (snow >= 1 && rain <= 1) {
        backgroundColor = "white";
        text = `${snow.toFixed(0)} cm`;
    }

    return (
        <View style={{ backgroundColor }} className="w-11/12 rounded-full px-2 items-center my-1">
            <Text className="text-black w-full text-center">{text}</Text>
        </View>
    );
};