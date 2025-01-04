import React from "react";
import { View, Text } from "react-native";
import { useWeatherStore } from "../lib/store";
import DROPLET from "../assets/icons/dazzleUI/droplet.svg";
import MOON from "../assets/icons/dazzleUI/moon.svg";
import SNOW from "../assets/icons/dazzleUI/snow.svg";
import SUN from "../assets/icons/dazzleUI/sun.svg";
import SUNRISE from "../assets/icons/dazzleUI/sunrise.svg";
import SUNSET from "../assets/icons/dazzleUI/sunset.svg";
import UMBRELLA from "../assets/icons/dazzleUI/umbrella.svg";
import WIND from "../assets/icons/dazzleUI/wind.svg";

interface DetailsHourlyProps {
    locId: string;
    dayIndex: string;
}

const DetailsGrid: React.FC<DetailsHourlyProps> = ({ locId, dayIndex }) => {
    const daily = useWeatherStore(
        (state) =>
            state.wReportGen.wReport.locations[locId].weather.days[dayIndex]
                .daily
    );

    const sunriseValue = new Date(daily.sunrise.replace(/Z$/, ""))
        .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const sunsetValue = new Date(daily.sunset.replace(/Z$/, ""))
        .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const precipProbValue = `${daily.precipitationProbability.toFixed(0)}%`;
    const sunPercentageValue = `${(daily.sunPercentage*100).toFixed(0)}%`;
    const precipitationValue = `${daily.precipitation.value.toFixed(0)}mm`;
    const snowfallValue = `${daily.snowfall.value.toFixed(0)}cm`;
    const uvIndexValue = daily.uvIndex.toFixed(0);
    const snowDepthValue = `${(daily.snowdepth.value*100).toFixed(0)}cm`;
    const precipHoursValue = daily.precipitationHours > 1.5 
        ? `${daily.precipitationHours.toFixed(0)}h` 
        : `${(daily.precipitationHours * 60).toFixed(0)}min`;
    const windSpeedValue = `${daily.maxWindSpeed.value.toFixed(0)}km/h`;
    return (
        <View className="bg-primary/30 rounded-3xl p-3">

        <View className="flex-row justify-between mb-1">
            <DetailsGridElement title="Sunrise" Icon={SUNRISE} value={sunriseValue} />
            <DetailsGridElement title="Sunset" Icon={SUNSET} value={sunsetValue} />
            <DetailsGridElement title="Sunshine" Icon={SUN} value={sunPercentageValue}/>
            <DetailsGridElement title="UV" Icon={SUN} value={uvIndexValue}/>
        </View>
        <View className="flex-row justify-between mb-1">
            <DetailsGridElement title="Chance" Icon={UMBRELLA} value={precipProbValue}/>
            <DetailsGridElement title="Rain" Icon={DROPLET} value={precipitationValue}/>
            <DetailsGridElement title="Hours" Icon={UMBRELLA} value={precipHoursValue}/>
            <DetailsGridElement title="Max Wind" Icon={WIND} value={windSpeedValue}/>
        </View>
        <View className="flex-row justify-between">
            <DetailsGridElement title="New" Icon={SNOW} value={snowfallValue}/>
            <DetailsGridElement title="Depth" Icon={SNOW} value={snowDepthValue}/>
        </View>
        </View>
    );
};

export default DetailsGrid;


const DetailsGridElement: React.FC<{
    title: string;
    Icon: any;
    value: string;
}> = ({ title, Icon, value}) => {
    return (
        <View className="items-center justify-center bg-primary/15 rounded-2xl p-2 m-1 w-24 h-24">
            <Text className="text-base">{title}</Text>
            <Icon width={25} height={25} />
            <Text className="text-base">{value}</Text>
        </View>
    );
};



