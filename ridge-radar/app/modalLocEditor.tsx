import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Modal() {
    const locId = useLocalSearchParams().locId;
    console.log(locId);
    return (
        <SafeAreaView className="flex-1 bg-transparent" >
            <View className="flex-1 justify-center items-center bg-primary rounded-3xl">
                <Text>locId: {locId.toString()}</Text>
            </View>
        </SafeAreaView>
    );
}