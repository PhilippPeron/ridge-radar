import { Tabs } from "expo-router";
import { View, TouchableWithoutFeedbackComponent } from "react-native";
import settings from "../../lib/settings";
import WeatherIcon from "../../assets/icons/weather.svg";
import BellIcon from "../../assets/icons/bell.svg";
import SettingsIcon from "../../assets/icons/settings.svg";

import tailwindConfig from "../../tailwind.config.js";
const tailwindColors = tailwindConfig?.theme?.extend?.colors;
const iconSize = 30;

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: tailwindColors?.text,
        tabBarInactiveTintColor: tailwindColors?.secondary,
        tabBarStyle:  { position: 'absolute', height: 70, paddingBottom: 0},
        tabBarLabelPosition: "beside-icon",
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Weather",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <View>
              <WeatherIcon height={iconSize*1.2} width={iconSize*1.2} fill={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <View>
              <BellIcon height={iconSize} width={iconSize} fill={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <View>
              <SettingsIcon height={iconSize} width={iconSize} fill={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
