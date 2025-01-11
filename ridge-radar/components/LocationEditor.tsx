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
import { globalLocations, dataStorer, globalActivities } from "../lib/globals";
import { Location } from "../types/locations";
import { useWeatherStore } from "../lib/store";
import { useEffect, useState } from "react";
import { getTagList } from "../lib/helpers";

const createEmptyLocation = (): Location => ({
    id: 0,
    display_name: "",
    name: "",
    country: "",
    country_code: "",
    administrative_area: "",
    elevation: 0,
    latitude: 0,
    longitude: 0,
    timezone: "",
    weather_model: "",
    activities: [],
    tags: [],
    notes: "",
});

const LocationEditor: React.FC<{
    locDataStr: string;
    newLoc: boolean;
}> = ({ locDataStr, newLoc }) => {
    const router = useRouter();
    const locIdStr = useLocalSearchParams().locId;
    const [locData, setLocData] = useState<Location>(createEmptyLocation());
    const [newTag, setNewTag] = useState<string>("");
    const [activitiesList] = useState(() =>
        Object.keys(globalActivities.activities)
    );
    const [tagsList] = useState(() => getTagList(globalLocations.locations));
    useEffect(() => {
        if (newLoc) {
            const locDataParts = Array.isArray(locDataStr)
                ? JSON.parse(locDataStr[0])
                : JSON.parse(locDataStr);
            setLocData({
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
            });
        } else {
            const locId = parseInt(
                Array.isArray(locIdStr) ? locIdStr[0] : locIdStr,
                10
            );
            const loc = globalLocations.locations.find(
                (loc) => loc.id === locId
            );
            if (!loc) {
                throw new Error(`Location with id ${locId} not found`);
            }
            setLocData({ ...loc });
        }
    }, [locDataStr, locIdStr, newLoc]);
    const wReportGen = useWeatherStore((state) => state.wReportGen);
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
        const [locationReport] = await wReportGen.getReportForLocations([
            locData,
        ]);
        wReportGen.wReport.locations[locData.id] = locationReport;
        const newWReportGen = Object.assign(
            Object.create(Object.getPrototypeOf(wReportGen)),
            wReportGen
        );
        setWeatherData(newWReportGen);
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

    return (
        <KeyboardAwareScrollView className="w-full h-full p-4">
            <View className="mb-4">
                <Text className="mb-1 mt-2 dark:text-text-dark">Location Name</Text>
                <TextInput
                    className="border border-gray-300 p-2 rounded-full text-text/40 dark:text-text-dark/40"
                    editable={false}
                    value={locData.name}
                />

                <Text className="mb-1 dark:text-text-dark">Display Name</Text>
                <TextInput
                    className="border border-gray-300 p-2 rounded-full dark:text-text-dark/40"
                    value={locData.display_name}
                    onChangeText={(val) => {
                        setLocData({ ...locData, display_name: val });
                    }}
                />
                <View className="flex-row justify-between">
                    <View className="flex-1 mr-1">
                        <Text className="mb-1 mt-2 dark:text-text-dark">Latitude</Text>
                        <TextInput
                            className="border border-gray-300 p-2 rounded-full text-text/40 dark:text-text-dark/40"
                            editable={false}
                            value={String(locData.latitude)}
                        />
                    </View>
                    <View className="flex-1 ml-1">
                        <Text className="mb-1 mt-2 dark:text-text-dark">Longitude</Text>
                        <TextInput
                            className="border border-gray-300 p-2 rounded-full text-text/40 dark:text-text-dark/40"
                            editable={false}
                            value={String(locData.longitude)}
                        />
                    </View>
                </View>
                <Text className="mb-1 mt-2 dark:text-text-dark">Elevation</Text>
                <TextInput
                    className="border border-gray-300 p-2 rounded-full text-text/40 dark:text-text-dark/40"
                    editable={false}
                    value={String(locData.elevation + "m")}
                />

                <Text className="mb-1 mt-2 dark:text-text-dark">Weather Model</Text>
                <View className="border border-gray-300 p-2 rounded-full">
                    <Picker
                        selectedValue={locData.weather_model}
                        onValueChange={(val) => {
                            setLocData({ ...locData, weather_model: val });
                        }}
                        style={{ width: "100%", height: 20 }}
                        itemStyle={{ fontSize: 4 }}
                        mode="dropdown"
                    >
                        <Picker.Item label="Best Match" value="best_match" />
                    </Picker>
                </View>

                <Text className="mb-1 mt-2 dark:text-text-dark">Tags</Text>
                <TextInput
                    className="border border-gray-300 p-2 pl-3 rounded-full dark:text-text-dark/40"
                    placeholder="Add tag"
                    value={newTag}
                    onChangeText={(val) => {
                        setNewTag(val);
                    }}
                    onSubmitEditing={(e) => {
                        const newTag = e.nativeEvent.text.trim();
                        if (newTag && !locData.tags.includes(newTag)) {
                            setLocData({
                                ...locData,
                                tags: [...locData.tags, newTag],
                            });
                        }
                        setNewTag("");
                    }}
                />
                <View className="flex-row flex-wrap">
                    {locData.tags
                        .filter((tag) => !tagsList.includes(tag))
                        .map((tag, index) => (
                            <TouchableOpacity
                                key={`custom-${index}`}
                                className="p-2 px-3 rounded-full m-1 ml-0 bg-yellow-400"
                                onPress={() => {
                                    setLocData({
                                        ...locData,
                                        tags: locData.tags.filter(
                                            (t) => t !== tag
                                        ),
                                    });
                                }}
                            >
                                <Text>{tag}</Text>
                            </TouchableOpacity>
                        ))}
                    {tagsList.map((tag, index) => {
                        const isActive = locData.tags.includes(tag);
                        return (
                            <TouchableOpacity
                                key={index}
                                className={`p-2 px-3 rounded-full m-1 ml-0 ${
                                    isActive ? "bg-yellow-400" : "bg-secondary/40 dark:bg-secondary-dark"
                                }`}
                                onPress={() => {
                                    if (isActive) {
                                        setLocData({
                                            ...locData,
                                            tags: locData.tags.filter(
                                                (t) => t !== tag
                                            ),
                                        });
                                    } else {
                                        setLocData({
                                            ...locData,
                                            tags: [...locData.tags, tag],
                                        });
                                    }
                                }}
                            >
                                <Text className="dark:text-text-dark">{tag}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                <Text className="mb-1 mt-2 dark:text-text-dark">Notes</Text>
                <TextInput
                    className="border border-gray-300 p-2 rounded-3xl dark:text-text-dark"
                    multiline
                    numberOfLines={8}
                    value={locData.notes}
                    onChangeText={(val) => {
                        setLocData({ ...locData, notes: val });
                    }}
                />

                <Text className="mb-1 mt-2 dark:text-text-dark">Activities</Text>
                <View className="flex-row flex-wrap">
                    {activitiesList.map((actitivity, index) => {
                        const isActive =
                            locData.activities.includes(actitivity);
                        return (
                            <TouchableOpacity
                                key={index}
                                className={`p-2 px-3 rounded-full m-1 ml-0 ${
                                    isActive ? "bg-yellow-400" : "bg-secondary/40"
                                }`}
                                onPress={() => {
                                    if (isActive) {
                                        setLocData({
                                            ...locData,
                                            activities:
                                                locData.activities.filter(
                                                    (t) => t !== actitivity
                                                ),
                                        });
                                    } else {
                                        setLocData({
                                            ...locData,
                                            activities: [
                                                ...locData.activities,
                                                actitivity,
                                            ],
                                        });
                                    }
                                }}
                            >
                                <Text className="dark:text-text-dark">{actitivity}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>

            <View className="space-x-4 mt-4 bottom-5 justify-end items-center">
                <TouchableOpacity
                    className="w-full h-14 my-1 rounded-full bg-green-400 justify-center items-center"
                    onPress={() =>
                        newLoc
                            ? saveNewLocation(locData)
                            : updateLocation(locData)
                    }
                >
                    <Text className=" dark:text-text-dark">Save</Text>
                </TouchableOpacity>
                <View className="flex-row w-full justify-between">
                    {!newLoc && (
                        <TouchableOpacity
                            className={`flex-1 h-14 my-1 rounded-full bg-red-500 justify-center items-center ${
                                !newLoc ? "mr-1" : ""
                            }`}
                            onPress={() => deleteLocation(locData.id)}
                        >
                            <Text className=" dark:text-text-dark">Delete</Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity
                        className={`flex-1 h-14 my-1 rounded-full bg-secondary/40 justify-center items-center ${
                            !newLoc ? "ml-1" : ""
                        }`}
                        onPress={() => router.back()}
                    >
                        <Text className="text-center dark:text-text-dark">Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View className="h-96"></View>
        </KeyboardAwareScrollView>
    );
};

export default LocationEditor;
