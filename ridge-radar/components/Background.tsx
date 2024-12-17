import React, { ReactNode } from "react";
import { ImageBackground, StyleSheet, ViewStyle } from "react-native";

export default function Background({ children }: BackgroundProps) {
    return (
        <ImageBackground
            source={require("../assets/images/bg_light_sun.png")}
            style={styles.background}
            blurRadius={150}
        >
          {children}
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
    } as ViewStyle,
});

interface BackgroundProps {
    children: ReactNode;
}
