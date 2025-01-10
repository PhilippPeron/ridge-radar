import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import { FlatList, View, Pressable } from "react-native";
import Background from "../../components/Background";
import { useWeatherStore } from "../../lib/store"; // Import the Zustand store
import LocationSummary from "../../components/LocationSummary"; // Import the new component
import { SafeAreaView } from "react-native-safe-area-context";
import SEARCH from "../../assets/icons/dazzleUI/search.svg";
import FILTER from "../../assets/icons/dazzleUI/filter.svg";
import { useColorScheme } from "react-native";

import tailwindConfig from "../../tailwind.config.js";
const tailwindColors = tailwindConfig?.theme?.extend?.colors;

export default function Tab() {
    const wReportGen = useWeatherStore((state) => state.wReportGen);
    console.log(wReportGen);
    const locIds: string[] = Object.keys(wReportGen.wReport.locations);
    console.log("locIds: ", locIds);
    const colorScheme = useColorScheme();
    const router = useRouter();
    const activeColor =
        colorScheme === "dark"
            ? tailwindColors?.active.dark
            : tailwindColors?.active.DEFAULT;
    
    useEffect(() => {
        console.log('Component re-rendered');
    }, [wReportGen]);
    return (
        <Background>
            {/* Add mb-16 to className to add margin bottom for tab bar */}
            <SafeAreaView className="flex-1 bg-transparent mb-16">
                <View className="flex-1 justify-center items-center px-2">
                    <FlatList
                        data={locIds}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View className="mb-4">
                                <LocationSummary locId={item} />
                            </View>
                        )}
                    />
                    <View className="absolute bottom-5 justify-center items-center flex-row bg-primary/80 dark:bg-primary-dark p-2 rounded-full">
                        <Pressable
                            className="flex-row items-center bg-primary dark:bg-secondary-dark p-4 rounded-full mr-0"
                            onPress={() => router.push("/modalFilter")}
                        >
                            <FILTER
                                height={30}
                                width={30}
                                stroke={activeColor}
                            />
                        </Pressable>
                        <Pressable
                            className="flex-row items-center bg-primary dark:bg-secondary-dark p-4 rounded-full ml-3"
                            onPress={() => router.push("/modalSearch")}
                        >
                            <SEARCH
                                height={30}
                                width={30}
                                stroke={activeColor}
                            />
                        </Pressable>
                    </View>
                </View>
            </SafeAreaView>
        </Background>
    );
}
