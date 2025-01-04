import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useWeatherStore } from "../lib/store";
import tailwindConfig from "@/tailwind.config";
import UMBRELLA from "../assets/icons/dazzleUI/umbrella.svg";
import SUNRISE from "../assets/icons/dazzleUI/sunrise.svg";

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

    const sunriseDate = new Date(daily.sunrise);
    const sunriseValue = `${sunriseDate.getHours()}:${sunriseDate.getMinutes().toString().padStart(2, '0')}`;
    const precipProbValue = `${daily.precipitationProbability.toFixed(0)}%`;
    return (
        <View className="bg-primary/30 rounded-3xl p-3 flex-row">
            <DetailsGridElement title="Sunrise" Icon={SUNRISE} value={sunriseValue} />
            <DetailsGridElement title="Chance" Icon={UMBRELLA} value={precipProbValue}/>
            <DetailsGridElement title="Chance" Icon={UMBRELLA} value={precipProbValue}/>
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
        <View className="items-center justify-center bg-primary/20 rounded-3xl p-2 m-1 w-24 h-24">
            <Text className="text-base">{title}</Text>
            <Icon width={25} height={25} />
            <Text className="text-base">{value}</Text>
        </View>
    );
};



