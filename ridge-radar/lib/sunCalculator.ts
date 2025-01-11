import SunCalc from "suncalc";

export class sunCalculator {
    getSunTimes(
        date: Date,
        latitude: number,
        longitude: number,
        height?: number
    ) {
        return SunCalc.getTimes(date, latitude, longitude, height);
    }
    getMoonTimes(date: Date, latitude: number, longitude: number) {
        return SunCalc.getMoonTimes(date, latitude, longitude);
    }
    getMoonIllumination(date: Date) {
        return SunCalc.getMoonIllumination(date);
    }
}
