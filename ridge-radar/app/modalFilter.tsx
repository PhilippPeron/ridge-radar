import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Modal() {
    return (
        <SafeAreaView className="flex-1 bg-transparent" >
            <View className="flex-1 justify-center items-center bg-primary rounded-3xl">
                <Text>Modal Filter Screen</Text>
            </View>
        </SafeAreaView>
    );
}
