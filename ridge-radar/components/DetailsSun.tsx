import React from "react";
import { View, Text } from "react-native";
import { useWeatherStore } from "../lib/store";
import MOON from "../assets/icons/dazzleUI/moon.svg";
import SUN from "../assets/icons/dazzleUI/sun.svg";
import SUNRISE from "../assets/icons/dazzleUI/sunrise.svg";
import SUNSET from "../assets/icons/dazzleUI/sunset.svg";
import { globalLocations } from "../lib/globals";

interface DetailsProps {
    locId: string;
    dayIndex: string;
}
// NOT USED: DELETE MAYBE
const DetailsSun: React.FC<DetailsProps> = ({ locId, dayIndex }) => {
    const daily = useWeatherStore(
        (state) =>
            state.wReportGen.wReport.locations[locId].weather.days[dayIndex]
                .daily
    );
    const location = globalLocations.locations.find(
        (loc) => loc.id === Number(locId)
    );

    const nightEndValue = location
        ? new Date(daily.nightEnd).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              timeZone: location.timezone,
          })
        : "N/A";
    const sunriseValue = location
        ? new Date(daily.sunrise).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              timeZone: location.timezone,
          })
        : "N/A";
    const goldenHourEndValue = location
        ? new Date(daily.goldenHourEnd).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              timeZone: location.timezone,
          })
        : "N/A";
    const solarNoonValue = location
        ? new Date(daily.solarNoon).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              timeZone: location.timezone,
          })
        : "N/A";
    const goldenHourStartValue = location
        ? new Date(daily.goldenHourStart).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              timeZone: location.timezone,
          })
        : "N/A";
    const sunsetValue = location
        ? new Date(daily.sunset).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              timeZone: location.timezone,
          })
        : "N/A";
    const nightStartValue = location
        ? new Date(daily.nightStart).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              timeZone: location.timezone,
          })
        : "N/A";
    const moonriseValue = location
        ? new Date(daily.moonrise).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              timeZone: location.timezone,
          })
        : "N/A";
    const moonsetValue = location
        ? new Date(daily.moonset).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              timeZone: location.timezone,
          })
        : "N/A";

    const moonFractionValue = `${(daily.moonFraction * 100).toFixed(0)}%`;
    return (
        <View className="w-full">
            <View className="flex-row justify-between mb-1">
                <DetailsGridElement
                    title="Night End"
                    Icon={MOON}
                    value={nightEndValue}
                />
                <DetailsGridElement
                    title="Sunrise"
                    Icon={SUNRISE}
                    value={sunriseValue}
                />
                <DetailsGridElement
                    title="Golden H."
                    Icon={SUNRISE}
                    value={goldenHourEndValue}
                />
                <DetailsGridElement
                    title="Solar Noon"
                    Icon={SUN}
                    value={solarNoonValue}
                />
            </View>
            <View className="flex-row justify-between mb-1">
                <DetailsGridElement
                    title="Golden H."
                    Icon={SUNSET}
                    value={goldenHourStartValue}
                />
                <DetailsGridElement
                    title="Sunset"
                    Icon={SUNSET}
                    value={sunsetValue}
                />
                <DetailsGridElement
                    title="Night Start"
                    Icon={MOON}
                    value={nightStartValue}
                />
                <DetailsGridElement
                    title="Moon %"
                    Icon={MOON}
                    value={moonFractionValue}
                />
            </View>
            <View className="flex-row justify-between mb-1">
                <DetailsGridElement
                    title="Moonrise"
                    Icon={MOON}
                    value={moonriseValue}
                />
                <DetailsGridElement
                    title="Moonset"
                    Icon={MOON}
                    value={moonsetValue}
                />
            </View>
        </View>
    );
};

export default DetailsSun;

const DetailsGridElement: React.FC<{
    title: string;
    Icon: any;
    value: string;
}> = ({ title, Icon, value }) => {
    return (
        <View className="flex-1 items-center justify-center bg-primary/15 rounded-2xl p-2 m-1 h-24">
            <Text className="text-base">{title}</Text>
            <Icon width={25} height={25} />
            <Text className="text-base">{value}</Text>
        </View>
    );
};
