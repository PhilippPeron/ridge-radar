import { View, Text, StyleSheet } from 'react-native';

export default function Tab() {
  return (
    <View style={styles.container}>
      <Text>Tab Settings</Text>
    </View>
  );
}
// TODO: Add credit screen for weather icons and openmeteteo and daily icons (Dazzle UI https://www.svgrepo.com/svg/532033/cloud)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
