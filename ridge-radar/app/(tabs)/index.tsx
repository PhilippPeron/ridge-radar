import React from "react";
import { FlatList, View, Text } from "react-native";
import Background from "../../components/Background";
import { useWeatherStore } from "../../lib/store"; // Import the Zustand store
import LocationSummary from "../../components/LocationSummary"; // Import the new component
import { SafeAreaView } from "react-native-safe-area-context";

export default function Tab() {
  const wReportGen = useWeatherStore((state) => state.wReportGen);
  const locIds: string[] = Object.keys(wReportGen.wReport.locations);

  return (
    <Background>
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
        </View>
      </SafeAreaView>
    </Background>
  );
}
