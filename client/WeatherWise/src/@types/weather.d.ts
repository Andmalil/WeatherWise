import { Dispatch, SetStateAction } from "react";

export interface IWeather {
    id: number;
    iconId: number;
    isDay: number;
    cityName: string;
    weatherStatus: string;
    currentTemp: { [key: string]: number };
    realFeel: { [key: string]: number };
    hourForecast: {temp: { [key: string]: number }, wind: { [key: string]: number }, weather: number}[][];
    uvLevel: number;
    humidity: number;
    windDirection: string;
    windDegree: number;
    windSpeed: { [key: string]: number };
    pressure: { [key: string]: number };
    sunrise: number;
    sunset: number;
    timezone: string;
    maxTemps: { today: { [key: string]: number }, tomorrow: { [key: string]: number }, thirdDay: { [key: string]: number } };
    minTemps: { today: { [key: string]: number }, tomorrow: { [key: string]: number }, thirdDay: { [key: string]: number } };
    forecastWeatherStatuses: { today: number, tomorrow: number, thirdDay: number }
}

export type UnitsType = {temp: string, wind: string, press: string}

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
    saveCurrentCity: (cityNumber: number) => void;
    currentUnits: UnitsType;
    saveCurrentUnits: (temp: string|null, wind: string|null, press: string|null) => void
}

export interface IChartProps {
    width: string,
    height: string,
    className: string
}

