// store.ts
import { create } from "zustand";

interface WeatherState {
    wReportGen: any;
    setWeatherData: (wReportGen: any) => void;
}

export const useWeatherStore = create<WeatherState>((set) => ({
    wReportGen: null,
    setWeatherData: (wReportGen) => {
      set({ wReportGen });
      console.log("Setting weather data:", wReportGen);
    },
}));
