import React, { ReactNode } from "react";
import { ImageBackground, StyleSheet, ViewStyle } from "react-native";
import { useColorScheme } from "react-native";

export default function Background({ children }: BackgroundProps) {
    const colorScheme = useColorScheme();
    return (
        colorScheme === "dark" ? (
            <ImageBackground
                source={require("../assets/images/bg_spots_dark.png")}
                style={styles.background}
                blurRadius={160}
            >
                {children}
            </ImageBackground>
        ) : (
            <ImageBackground
                source={require("../assets/images/bg_medium_sun_lower.png")}
                style={styles.background}
                blurRadius={300}
            >
                {children}
            </ImageBackground>
        )
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: "100%",
    } as ViewStyle,
});

interface BackgroundProps {
    children: ReactNode;
}
