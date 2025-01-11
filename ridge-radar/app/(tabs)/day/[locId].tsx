import React, { useLayoutEffect, useRef, useEffect } from "react";
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
                        color={colorScheme==="dark" ? "white" : "black"}
                    />
                </TouchableOpacity>
            ),
        });
    }, [navigation, location.name]);

    return (
        <Background>
            <SafeAreaView className="flex-1 bg-transparent mb-16 mt-14">
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        className="mt-4"
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
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        className="mt-4 w-fit m-2"
                    >
                        <View className="mb-4 bg-primary/30 rounded-3xl p-2 items-center">
                            <Text className="text-xl">Hourly</Text>
                            <DetailsHourly locId={locId} dayIndex={dayIndex} />
                        </View>
                        {location.notes && location.notes.trim() !== "" && (
                            <View className="mb-4 bg-primary/30 rounded-3xl p-2 items-center">
                                <Text className="text-xl">Notes</Text>
                                <Text className="text-sm w-full m-1 ml-3">{location.notes}</Text>
                            </View>
                        )}
                        <View className=" bg-primary/30 rounded-3xl p-2 items-center">
                            <Text className="text-xl mb-1">Details</Text>
                            <DetailsGrid locId={locId} dayIndex={dayIndex} />
                        </View>
                    </ScrollView>
            </SafeAreaView>
        </Background>
    );
}
