import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Background from '../../components/Background';

export default function Tab() {
  return (
    <Background>
      <View style={styles.container}>
        <Text style={styles.text}>Tab Weather</Text>
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
