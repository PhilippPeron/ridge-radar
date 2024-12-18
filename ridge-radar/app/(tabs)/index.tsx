import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import Background from '../../components/Background';
import { useWeatherStore } from '../../lib/store'; // Import the Zustand store
import LocationSummary from '../../components/LocationSummary'; // Import the new component

export default function Tab() {
  const wReportGen = useWeatherStore((state) => state.wReportGen);
  const locIds: string[] = Object.keys(wReportGen.wReport.locations);

  return (
    <Background>
      <View style={styles.container}>
        <Text style={styles.text}>Tab Weather</Text>
        <FlatList
          data={locIds}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <LocationSummary locationId={item} />
          )}
        />
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  text: {
    fontSize: 24, // Adjusted to match 'text-3xl'
    color: '#000', // Ensure text color is visible
  },
});
