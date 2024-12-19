import settings from "./settings";
// WeatherNow Icons
import CLEAR0 from "../assets/icons/weatherNow/CLEAR0.svg";
import CLEAR1 from "../assets/icons/weatherNow/CLEAR1.svg";
import FOG from "../assets/icons/weatherNow/FOG.svg";
import LSNOW from "../assets/icons/weatherNow/LSNOW.svg";
import MCLOUDY from "../assets/icons/weatherNow/MCLOUDY.svg";
import MCLOUDY0 from "../assets/icons/weatherNow/MCLOUDY0.svg";
import MCLOUDY1 from "../assets/icons/weatherNow/MCLOUDY1.svg";
import PCLOUDY0 from "../assets/icons/weatherNow/PCLOUDY0.svg";
import PCLOUDY1 from "../assets/icons/weatherNow/PCLOUDY1.svg";
import RAIN from "../assets/icons/weatherNow/RAIN.svg";
import SHOWER from "../assets/icons/weatherNow/SHOWER.svg";
import SNOW from "../assets/icons/weatherNow/SNOW.svg";
import TSTORM from "../assets/icons/weatherNow/TSTORM.svg";
import UNKNOWN0 from "../assets/icons/weatherNow/UNKNOWN0.svg";

export const getIcon = (wmoCode: number, isDay: boolean) => {
    if (settings.weatherIcons == "weatherNow") {
        return getWeatherNowIcon(wmoCode, isDay);
    }
    return UNKNOWN0;
};

const getWeatherNowIcon = (wmoCode: number, isNight: boolean) => {
    switch (wmoCode) {
        case 0: // Clear sky
            return isNight ? CLEAR0 : CLEAR1;
        case 1: // Mainly clear
            return isNight ? PCLOUDY0 : PCLOUDY1;
        case 2: // Partly cloudy
            return isNight ? MCLOUDY0 : MCLOUDY1;
        case 3: // Overcast
            return MCLOUDY;
        case 45: // Fog
        case 48: // Depositing rime fog
            return FOG;
        case 51: // Drizzle: Light intensity
        case 53: // Drizzle: Moderate intensity
        case 55: // Drizzle: Dense intensity
            return SHOWER;
        case 56: // Freezing Drizzle: Light intensity
        case 57: // Freezing Drizzle: Dense intensity
            return SHOWER;
        case 61: // Rain: Slight intensity
            return SHOWER;
        case 63: // Rain: Moderate intensity
        case 65: // Rain: Heavy intensity
            return RAIN;
        case 66: // Freezing Rain: Light intensity
        case 67: // Freezing Rain: Heavy intensity
            return SHOWER;
        case 71: // Snow fall: Slight intensity
            return LSNOW;
        case 73: // Snow fall: Moderate intensity
        case 75: // Snow fall: Heavy intensity
            return SNOW;
        case 77: // Snow grains
            return LSNOW;
        case 80: // Rain showers: Slight intensity
            return SHOWER;
        case 81: // Rain showers: Moderate intensity
        case 82: // Rain showers: Violent intensity
            return RAIN;
        case 85: // Snow showers: Slight intensity
            return LSNOW;
        case 86: // Snow showers: Heavy intensity
            return SNOW;
        case 95: // Thunderstorm: Slight or moderate
        case 96: // Thunderstorm with slight hail
        case 99: // Thunderstorm with heavy hail
            return TSTORM;
        default:
            return UNKNOWN0;
    }
};
