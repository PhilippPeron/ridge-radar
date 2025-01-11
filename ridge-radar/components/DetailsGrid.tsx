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
import { globalLocations } from "../lib/globals";

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

    const precipProbValue = `${daily.precipitationProbability.toFixed(0)}%`;
    const sunPercentageValue = `${(daily.sunPercentage * 100).toFixed(0)}%`;
    const precipitationValue = `${daily.precipitation.value.toFixed(0)}mm`;
    const snowfallValue = `${daily.snowfall.value.toFixed(0)}cm`;
    const uvIndexValue = daily.uvIndex.toFixed(0);
    const snowDepthValue = `${(daily.snowdepth.value * 100).toFixed(0)}cm`;
    const precipHoursValue =
        daily.precipitationHours > 1.5
            ? `${daily.precipitationHours.toFixed(0)}h`
            : `${(daily.precipitationHours * 60).toFixed(0)}min`;
    const windSpeedValue = `${daily.maxWindSpeed.value.toFixed(0)}km/h`;
    return (
        <View className="w-full">
            <View className="flex-row justify-between mb-1">
                <DetailsGridElement
                    title="Sunshine"
                    Icon={SUN}
                    value={sunPercentageValue}
                />
                <DetailsGridElement
                    title="UV"
                    Icon={SUN}
                    value={uvIndexValue}
                />
                <DetailsGridElement
                    title="Max Wind"
                    Icon={WIND}
                    value={windSpeedValue}
                />
                <DetailsGridElement
                    title="Hours"
                    Icon={UMBRELLA}
                    value={precipHoursValue}
                />
            </View>
            <View className="flex-row justify-between mb-1">
                <DetailsGridElement
                    title="Chance"
                    Icon={UMBRELLA}
                    value={precipProbValue}
                />
                <DetailsGridElement
                    title="Rain"
                    Icon={DROPLET}
                    value={precipitationValue}
                />
                <DetailsGridElement
                    title="New"
                    Icon={SNOW}
                    value={snowfallValue}
                />
                <DetailsGridElement
                    title="Depth"
                    Icon={SNOW}
                    value={snowDepthValue}
                />
            </View>
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
            <View className="flex-row justify-between">
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

export default DetailsGrid;

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
