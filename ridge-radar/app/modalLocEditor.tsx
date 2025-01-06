import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import LocationEditor from "../components/LocationEditor";

export default function Modal() {
    const newLoc: boolean = useLocalSearchParams().newLoc === "true";
    const locDataParam = useLocalSearchParams().newLocData;
    const locDataStr: string = Array.isArray(locDataParam) ? locDataParam[0] : locDataParam;

    return (
        <SafeAreaView className="flex-1 bg-transparent">
            <View className="flex-1 bg-primary rounded-3xl">
                <LocationEditor locDataStr={locDataStr} newLoc={newLoc} />
            </View>
        </SafeAreaView>
    );
}
