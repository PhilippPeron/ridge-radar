import { View, Text, StatusBar } from 'react-native';
import Logo from '../../assets/icons/pencil.svg';

export default function Tab() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="font-rblack">Tab Notifications</Text>
      <Logo width={100} height={100} fill={"#000"}/>
      <StatusBar translucent={true}/>
    </View>
  );
}
