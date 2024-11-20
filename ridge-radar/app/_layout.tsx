import { Slot, Stack } from "expo-router";
import "../global.css";
import React from "react";

const RooyLayout = () => {
  return (
    <Stack>
        <Stack.Screen name="index" options={{ headerShown: false}} />
        <Slot />
    </Stack>
    );
};

export default RooyLayout;
