import { router, useLocalSearchParams, useRouter } from "expo-router";
import {
    Text,
    TouchableOpacity,
    View,
    Pressable,
    TextInput,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Picker } from "@react-native-picker/picker";
import { globalLocations, dataStorer } from "../lib/globals";
import { Location } from "../types/locations";
import { useWeatherStore } from "../lib/store";
import { useEffect } from "react";

const LocationEditor: React.FC<{
    locDataStr: string;
    newLoc: boolean;
}> = ({ locDataStr, newLoc }) => {
    const router = useRouter();
    const locIdStr = useLocalSearchParams().locId;
    let locData: Location;
    const wReportGen = useWeatherStore((state) => state.wReportGen);
    console.log("wReportGen: ", wReportGen);
    const setWeatherData = useWeatherStore((state) => state.setWeatherData);

    async function saveNewLocation(locData: Location) {
        // Save new location to store
        console.log("Saving new location");
        globalLocations.locations.push(locData);
        dataStorer.saveToStorage("locations", globalLocations);
        const [locationReport] = await wReportGen.getReportForLocations([
            locData,
        ]);
        wReportGen.wReport.locations[locData.id] = locationReport;
        console.log("wReportGen after await: ", wReportGen.wReport.locations);
        console.log("Added new location to report");
        const newWReportGen = Object.assign(
            Object.create(Object.getPrototypeOf(wReportGen)),
            wReportGen
        );
        setWeatherData(newWReportGen);
        router.back();
    }

    async function updateLocation(locData: Location) {
        // Update location in store
        console.log("Updating location");
        const existingLoc = globalLocations.locations.find(
            (loc) => loc.id === locData.id
        );
        if (existingLoc) {
            Object.assign(existingLoc, locData);
        } else {
            throw new Error(`Location with id ${locData.id} not found`);
        }
        dataStorer.saveToStorage("locations", globalLocations);
        console.log("wReportGen: ", wReportGen);
        const [locationReport] = await wReportGen.getReportForLocations([
            locData,
        ]);
        wReportGen.wReport.locations[locData.id] = locationReport;
        const newWReportGen = Object.assign(
            Object.create(Object.getPrototypeOf(wReportGen)),
            wReportGen
        );
        setWeatherData(newWReportGen);
        console.log("wReportGen: ", wReportGen);
        console.log("Updated location in report");
        router.back();
    }

    function deleteLocation(locId: number) {
        // Delete location from store
        globalLocations.locations = globalLocations.locations.filter(
            (loc) => loc.id !== locId
        );
        dataStorer.saveToStorage("locations", globalLocations);
        delete wReportGen.wReport.locations[locId];
        const newWReportGen = Object.assign(
            Object.create(Object.getPrototypeOf(wReportGen)),
            wReportGen
        );
        setWeatherData(newWReportGen);
        console.log("Removed location");
        router.back();
    }

    function findEmptyLocId() {
        // Find an empty location id
        const locIdList = globalLocations.locations.map((loc) => loc.id);
        let i = 0;
        while (locIdList.includes(i)) {
            i++;
        }
        return i;
    }
    if (newLoc) {
        const locDataParts = Array.isArray(locDataStr)
            ? JSON.parse(locDataStr[0])
            : JSON.parse(locDataStr);
        locData = {
            id: findEmptyLocId(),
            display_name: locDataParts.name,
            name: locDataParts.name,
            country: locDataParts.lat,
            country_code: locDataParts.country_code,
            administrative_area: locDataParts.administrative_area,
            elevation: locDataParts.elevation,
            latitude: locDataParts.latitude,
            longitude: locDataParts.longitude,
            timezone: locDataParts.timezone,
            weather_model: "",
            activities: [],
            tags: [],
            notes: "",
        };
    } else {
        const locId = parseInt(
            Array.isArray(locIdStr) ? locIdStr[0] : locIdStr,
            10
        );
        locData = globalLocations.locations.find(
            (loc) => loc.id === locId
        ) as Location;
        if (!locData) {
            throw new Error(`Location with id ${locId} not found`);
        }
    }

    return (
        <KeyboardAwareScrollView className="w-full h-full p-4">
            <View className="mb-4">
                <Text className="mb-1 mt-2">Location Name</Text>
                <TextInput
                    className="border border-gray-300 p-2 rounded text-text/60"
                    editable={false}
                    value={locData.name}
                />

                <Text className="mb-1">Display Name</Text>
                <TextInput
                    className="border border-gray-300 p-2 rounded"
                    value={locData.display_name}
                    onChangeText={(val) => {}}
                />
                <Text className="mb-1 mt-2">Latitude</Text>
                <TextInput
                    className="border border-gray-300 p-2 rounded text-text/60"
                    editable={false}
                    value={String(locData.latitude)}
                />

                <Text className="mb-1 mt-2">Longitude</Text>
                <TextInput
                    className="border border-gray-300 p-2 rounded text-text/60"
                    editable={false}
                    value={String(locData.longitude)}
                />
                <Text className="mb-1 mt-2">Elevation</Text>
                <TextInput
                    className="border border-gray-300 p-2 rounded text-text/60"
                    editable={false}
                    value={String(locData.elevation + "m")}
                />

                <Text className="mb-1 mt-2">Weather Model</Text>
                <Picker
                    selectedValue={locData.weather_model}
                    onValueChange={(val) => {}}
                    style={{ borderWidth: 1, borderColor: "#ccc" }}
                >
                    <Picker.Item label="Best Match" value="best_match" />
                </Picker>

                <Text className="mb-1 mt-2">Tags</Text>
                <TextInput
                    className="border border-gray-300 p-2 rounded"
                    placeholder="Add tags"
                    value={(locData.tags || []).join(", ")}
                    onChangeText={(val) => {}}
                />

                <Text className="mb-1 mt-2">Notes</Text>
                <TextInput
                    className="border border-gray-300 p-2 rounded"
                    multiline
                    numberOfLines={4}
                    value={locData.notes}
                    onChangeText={(val) => {}}
                />

                <Text className="mb-1 mt-2">Activities</Text>

                <TouchableOpacity
                    className=" bg-gray-300 p-2 rounded"
                    onPress={() => {}}
                >
                    <Text>Select Activities</Text>
                </TouchableOpacity>
            </View>

            <View className="space-x-4 mt-4 bottom-5 justify-end items-center">
                <TouchableOpacity
                    className="w-full h-14 m-1 rounded-full bg-secondary justify-center items-center"
                    onPress={() =>
                        newLoc
                            ? saveNewLocation(locData)
                            : updateLocation(locData)
                    }
                >
                    <Text>Save</Text>
                </TouchableOpacity>
                <View className="flex-row w-full justify-between">
                    {!newLoc && (
                        <TouchableOpacity
                            className="flex-1 h-14 m-1 rounded-full bg-red-500 justify-center items-center"
                            onPress={() => deleteLocation(locData.id)}
                        >
                            <Text>Delete</Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity
                        className="flex-1 h-14 m-1 rounded-full bg-secondary justify-center items-center"
                        onPress={() => router.back()}
                    >
                        <Text className="text-center">Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View className="h-96"></View>
        </KeyboardAwareScrollView>
    );
};

export default LocationEditor;
