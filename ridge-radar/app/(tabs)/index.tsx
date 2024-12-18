import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import Background from '../../components/Background';
import { useWeatherStore } from '../../lib/store'; // Import the Zustand store

export default function Tab() {
  const wReportGen = useWeatherStore((state) => state.wReportGen);

  return (
    <Background>
      <View style={styles.container}>
        <Text style={styles.text}>Tab Weather</Text>
        <FlatList
          data={wReportGen.wReport.locations}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View>
              <Text>{item.name}</Text>
              <Text>{item.elevation}m</Text>
            </View>
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
