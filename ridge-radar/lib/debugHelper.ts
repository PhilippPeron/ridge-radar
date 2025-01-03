import { debugFlag } from "./globals"
import { Platform } from "react-native";

export function debugDownloadIfWeb(object: any, filename: string) {
    // Download the object as a JSON file if we are running on the web and the debug flag is set
    if (Platform.OS === "web" && debugFlag) {
        const wReportJson = JSON.stringify(object, null, 4);
        const blob = new Blob([wReportJson], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}