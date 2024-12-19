import React, { useLayoutEffect, useRef, useEffect } from "react";
import { Text, TouchableOpacity, ScrollView, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import Background from "../../../components/Background";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useWeatherStore } from "../../../lib/store"; // Import the Zustand store
import LocationSummaryDay from "../../../components/LocationSummaryDay";

export default function Day() {
    const { locId, dayIndex } = useLocalSearchParams<{
        locId: string;
        dayIndex?: string;
    }>();
    const dayIndexInt = parseInt(dayIndex || "0");
    const navigation = useNavigation();
    const router = useRouter();
    const location = useWeatherStore(
        (state) => state.wReportGen.wReport.locations[locId]
    );
    const day = useWeatherStore((state) => state.wReportGen.wReport.locations[locId].weather.days[dayIndexInt]);
    const { name, weather } = location;
    const scrollViewRef = useRef<ScrollView>(null);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTransparent: true,
            title: name,
            headerTitleAlign: "center",
            headerLeft: () => (
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons
                        className="ml-4"
                        name="arrow-back"
                        size={24}
                        color="black"
                    />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    useEffect(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ x: dayIndexInt * 90 - 155, animated: true }); // Adjust the scroll position as needed
        }
    }, [dayIndexInt]);

    return (
        <Background>
            <SafeAreaView style={{ flex: 1, marginTop: 60}}>
                <View className="justify-center items-center px-2">
                <ScrollView
                    ref={scrollViewRef}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className="mt-4"
                >
                    {weather.days.map((_, index: number) => (
                        <LocationSummaryDay key={index} dayIndex={index} locId={locId} isSelected={index === dayIndexInt} />
                    ))}
                </ScrollView>
                <Text className="mt-0">
                    locId: {locId}
                    dayIndex: {dayIndex}
                </Text>
                </View>
            </SafeAreaView>
        </Background>
    );
}