import React, { useLayoutEffect, useRef, useEffect, useState } from "react";
import { Text, TouchableOpacity, ScrollView, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import Background from "../../../components/Background";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useWeatherStore } from "../../../lib/store"; // Import the Zustand store
import LocationSummaryDay from "../../../components/LocationSummaryDay";
import DetailsHourly from "../../../components/DetailsHourly";
import DetailsGrid from "../../../components/DetailsGrid";
import { useColorScheme } from "react-native";

export default function Day() {
    const { locId, dayIndex } = useLocalSearchParams<{
        locId: string;
        dayIndex: string;
    }>();
    const dayIndexInt = parseInt(dayIndex || "0");
    const navigation = useNavigation();
    const colorScheme = useColorScheme();
    const router = useRouter();
    const location = useWeatherStore(
        (state) => state.wReportGen.wReport.locations[locId]
    );

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTransparent: true,
            title: location.name,
            headerTitleAlign: "center",
            headerLeft: () => (
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="w-16 h-16 justify-center"
                >
                    <Ionicons
                        className="ml-4"
                        name="arrow-back"
                        size={24}
                        color={colorScheme === "dark" ? "white" : "black"}
                    />
                </TouchableOpacity>
            ),
        });
    }, [navigation, location.name]);

    return (
        <Background>
            <SafeAreaView className="bg-transparent mb-10 mt-14 flex-1">
                <View className="">
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        className="mt-4 m-2"
                    >
                        {location.weather.days.map((_, index: number) => (
                            <LocationSummaryDay
                                key={index}
                                dayIndex={index}
                                locId={locId}
                                isSelected={index === dayIndexInt}
                            />
                        ))}
                    </ScrollView>
                </View>
                <View className="flex-1">
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        className="mt-1 m-2"
                    >
                        <TitleWithChildren title="Stündlich">
                            <DetailsHourly locId={locId} dayIndex={dayIndex} />
                        </TitleWithChildren>
                        {location.notes && location.notes.trim() !== "" && (
                            <TitleWithChildren title="Notes">
                                <Text className="text-sm w-full m-1 ml-3">
                                    {location.notes}
                                </Text>
                            </TitleWithChildren>
                        )}
                        <TitleWithChildren title="Details">
                            <DetailsGrid locId={locId} dayIndex={dayIndex} />
                        </TitleWithChildren>
                        {/* <View className=" bg-primary/20 rounded-3xl p-2 items-center mb-4">
                            <Text className="text-xl mb-1">Sun & Moon</Text>
                            <DetailsSun locId={locId} dayIndex={dayIndex} />
                        </View> */}
                    </ScrollView>
                </View>
            </SafeAreaView>
        </Background>
    );
}

interface TitleWithChildrenProps {
    title: string;
    children: any;
}

const TitleWithChildren: React.FC<TitleWithChildrenProps> = ({
    title,
    children,
}) => {
    const [show, setShow] = useState(true);
    return (
        <View className="mb-4 bg-primary/15 rounded-3xl p-2">
            <TouchableOpacity className=" p-1" onPress={() => setShow(!show)}>
                <Text className="text-xl mb-1 text-center">{title}</Text>
            </TouchableOpacity>
            {show && children}
        </View>
    );
};
