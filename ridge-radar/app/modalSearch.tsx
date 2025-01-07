import { usePathname, useRouter } from "expo-router";
import React, { useState } from "react";
import {
    TextInput,
    FlatList,
    TouchableOpacity,
    View,
    Text,
    Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Modal() {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<
        {
            id: number;
            name: string;
            administrative_area: string;
            country: string;
            country_code: string;
            elevation: number;
            latitude: number;
            longitude: number;
            timezone: string;
        }[]
    >([]);
    const router = useRouter();

    const fetchSuggestions = async (text: string) => {
        setQuery(text);
        if (text.length > 2) {
            try {
                const response = await fetch(
                    `https://geocoding-api.open-meteo.com/v1/search?name=${text}&count=10&language=de&format=json`
                );
                const result = await response.json();
                const data = Array.isArray(result.results)
                    ? result.results.map((item: any) => ({
                          id: item.id,
                          name: item.name,
                          country: item.country,
                          country_code: item.country_code,
                          elevation: item.elevation,
                          administrative_area: item.admin1,
                          latitude: item.latitude,
                          longitude: item.longitude,
                          timezone: item.timezone,
                      }))
                    : [];
                setSuggestions(data);
            } catch (error) {
                console.error(error);
            }
        } else {
            setSuggestions([]);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-transparent">
            <View className="flex-1 justify-start items-center bg-primary rounded-3xl p-4">
                <TextInput
                    className="w-full p-2 h-14 px-5 mb-1 bg-secondary/40 rounded-full text-lg"
                    placeholder="Suche nach Ort..."
                    value={query}
                    onChangeText={fetchSuggestions}
                    autoFocus={true}
                />
                <View className="w-full bg-secondary/40 my-2 rounded-3xl">
                    <FlatList
                        data={suggestions}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View className="w-full flex-row items-center justify-between">
                                <TouchableOpacity
                                    className="h-14 my-1 justify-center flex-1"
                                    onPress={() =>
                                        router.replace({
                                            pathname: "/modalLocEditor",
                                            params: { newLoc: "true", newLocData: JSON.stringify(item) },
                                        })
                                    }
                                >
                                    <Text
                                        className="pl-5 text-left"
                                        numberOfLines={1}
                                        ellipsizeMode="head"
                                    >
                                        {item.name},{" "}
                                        {item.administrative_area ? `${item.administrative_area}, ` : ""}
                                        {item.country_code} ({item.elevation}m)
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}
