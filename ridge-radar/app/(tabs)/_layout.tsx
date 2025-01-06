import { Tabs, Stack, Layout } from "expo-router";
import { View, Pressable } from "react-native";
import { globalSettings } from "../../lib/globals";
import WeatherIcon from "../../assets/icons/weather.svg";
import BellIcon from "../../assets/icons/bell.svg";
import SettingsIcon from "../../assets/icons/settings.svg";

import tailwindConfig from "../../tailwind.config.js";
const tailwindColors = tailwindConfig?.theme?.extend?.colors;
const iconSize = 30;

import { useColorScheme } from "react-native";

export default function TabsLayout() {
    const colorScheme = useColorScheme();
    const inactiveTintColor =
        colorScheme === "dark"
            ? tailwindColors?.secondary.dark
            : tailwindColors?.secondary.DEFAULT;
    const tabBarColor =
        colorScheme === "dark"
            ? tailwindColors?.primary.dark
            : tailwindColors?.primary.DEFAULT;
    const activeColor =
        colorScheme === "dark"
            ? tailwindColors?.active.dark
            : tailwindColors?.active.DEFAULT;
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: activeColor,
                tabBarBackground: () => (
                    <View style={{ backgroundColor: tabBarColor, flex: 1 }} />
                ),
                tabBarInactiveTintColor: inactiveTintColor,
                tabBarStyle: {
                    position: "absolute",
                    height: 80, // !! Uncomment to show tab bar
                    paddingBottom: 18, // !! Uncomment to show tab bar
                },
                tabBarLabelPosition: "beside-icon",
                tabBarShowLabel: false,
                tabBarButton: (props) => (
                    <Pressable {...props} android_ripple={null} />
                ),
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Weather",
                    // href: null, // !! Disable to show tab
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <View>
                            <WeatherIcon
                                height={iconSize * 1.2}
                                width={iconSize * 1.2}
                                fill={color}
                            />
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="notifications"
                options={{
                    headerShown: false,
                    href: null, // !! Disable to show tab
                    tabBarIcon: ({ color }) => (
                        <View>
                            <BellIcon
                                height={iconSize}
                                width={iconSize}
                                fill={color}
                            />
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    headerShown: false,
                    // href: null, // !! Disable to show tab
                    tabBarIcon: ({ color }) => (
                        <View>
                            <SettingsIcon
                                height={iconSize}
                                width={iconSize}
                                fill={color}
                            />
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="day/[locId]"
                options={{
                    href: null,
                }}
            />
        </Tabs>
    );
}
