import { Dispatch, SetStateAction } from "react";

export interface IWeather {
    id: number;
    iconId: number;
    isDay: number;
    cityName: string;
    weatherStatus: string;
    currentTemp: number;
    realFeel: number;
    tempUnits: string;
    hourForecast: number[];
    uvLevel: number;
    humidity: number;
    windDirection: string;
    windDegree: number;
    windSpeed: number;
    pressure: number;
}

export type HintType = {
    ID: number, 
    Name: string, 
    NameASCII: string, 
    Lat: number, 
    Lng: number, 
    Country: string
}

export type WeatherContextType = {
    searchHints: HintType[];
    saveSearchHints: (hints: HintType[]) => void;
    forecasts: IWeather[];
    saveForecast: (newWeather: IWeather) => void;
    currentCity: number;
    saveCurrentCity: (cityNumber: number) => void
}