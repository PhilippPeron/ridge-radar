import Background from "@/components/Background";
import { globalSettings, dataStorer } from "@/lib/globals";
import { Alert } from "react-native";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



export default function Tab() {
    return (
        <Background>
        <SafeAreaView className="flex-1 bg-transparent">
            <View className="flex-1 rounded-3xl">
                <Text className="text-4xl m-5 dark:text-text-dark">Settings</Text>

                <ScrollView className="flex-1">
                    <SettingsElement
                        title="Change to Dark Mode"
                        onPress={() => {toggleDarkMode()}}
                    >
                        <Text className=" dark:text-text-dark">Change color theme</Text>
                    </SettingsElement>
                    <Text className="text-2xl m-5 my-2 dark:text-text-dark">Dangerous</Text>
                    <SettingsElement
                        title="Delete Data"
                        onPress={() => {
                            deleteAsyncStorageKeys();
                        }}
                    >
                        <Text className=" dark:text-text-dark">Delete all user data</Text>
                    </SettingsElement>
                </ScrollView>
            </View>
        </SafeAreaView>
        </Background>
    );
}
// TODO: Add credit screen for weather icons and openmeteteo and daily icons (Dazzle UI https://www.svgrepo.com/svg/532033/cloud)

interface SettingsElementProps {
    title: string;
    children: React.ReactNode;
    [key: string]: any; // Allow additional props
}

const SettingsElement: React.FC<SettingsElementProps> = ({
    title,
    children,
    ...rest
}) => {
    return (
        <TouchableOpacity
            className="bg-secondary/40 rounded-3xl px-4 p-3 m-1"
            {...rest} // Pass additional props to TouchableOpacity
        >
            <Text className="text-2xl dark:text-text-dark">{title}</Text>
            {children}
        </TouchableOpacity>
    );
};


function toggleDarkMode() {
  globalSettings.theme = globalSettings.theme === "light" ? "dark" : "light";
  dataStorer.saveToStorage("settings", globalSettings);
  Alert.alert("Theme changed", "Changes apply after a restart.");
}


export function deleteAsyncStorageKeys() {
  const keys = ["settings", "activities", "locations"];
  Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete all data?",
      [
          {
              text: "Cancel",
              onPress: () => {return},
              style: "cancel"
          },
          {
              text: "OK",
              onPress: async () => {
                  for (const key of keys) {
                      await dataStorer.deleteFromStorage(key);
                  }
                  Alert.alert("Deleted Data", "Please restart the App.", [{ text: " " }]);
              }
          }
      ],
      { cancelable: false }
  );
}
