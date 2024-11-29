import { View, Text, StyleSheet, StatusBar } from 'react-native';
import Logo from '../../assets/icons/pencil.svg';

export default function Tab() {
  return (
    <View style={styles.container}>
      <Text className="font-rblack">Tab Notifications</Text>
      <Logo width={100} height={100} fill={"#000"}/>
      <StatusBar translucent={true}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
