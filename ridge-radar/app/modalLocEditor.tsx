import { useLocalSearchParams } from "expo-router";
import { Text, TouchableOpacity, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useWeatherStore } from "../lib/store";

export default function Modal() {
    const newLoc = useLocalSearchParams().newLoc === "true";
    let locData = {};
    if (newLoc) {
        const locDataStr = useLocalSearchParams().newLocData;
        console.log(locDataStr);
        locData = Array.isArray(locDataStr) ? JSON.parse(locDataStr[0]) : JSON.parse(locDataStr);
    }
    else {
        const locIdStr = useLocalSearchParams().locId;
        const locId = parseInt(Array.isArray(locIdStr) ? locIdStr[0] : locIdStr, 10);
        locData = useWeatherStore((state) => state.wReportGen.wReport.locations[locId]);
    }


    return (
        <SafeAreaView className="flex-1 bg-transparent" >
            <View className="flex-1 justify-center items-center bg-primary rounded-3xl">
                <Text>{locData.toString()}</Text>
                
                <View className="flex-row space-x-4 mt-4 absolute bottom-5">
                    {!newLoc && (
                        <TouchableOpacity className="rounded-3xl" onPress={() => deleteLocation(locData.id)}>
                            <Text>Delete</Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity onPress={() => {/* Handle cancel action */}}>
                        <Text>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => newLoc ? saveNewLocation(locData) : updateLocation(locData)}>
                        <Text>Save</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    );
}


function saveNewLocation(locDataFormated: Location) {
    // Save new location to store
}

function updateLocation(locDataFormated: Location) {
    // Update location in store
}

function deleteLocation(locId: number) {
    // Delete location from store
}