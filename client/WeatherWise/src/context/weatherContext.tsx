import * as React from "react";
import {  IWeather, HintType, WeatherContextType } from "../@types/weather"


export const WeatherContext = React.createContext<WeatherContextType | null>(null)

export const WeatherProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [forecasts, setForecasts] = React.useState<IWeather[]>([
        {
            id: 1,
            iconId: 1000,
            isDay: 0,
            cityName: "Moscow",
            weatherStatus: "Clear",
            currentTemp: -49,
            realFeel: -50,
            tempUnits: "C",
            hourForecast: [2, 1, 2, 3, 4, 2, 3, 4, 5, 2, 1, 0, -1, 1, 2, 3, 4, 2, 3, 4, 5, 2, 1, 0, -1],
            uvLevel: 11,
            humidity: 89,
            windDirection: "WNW",
            windDegree: 287,
            windSpeed: 14.8,
            pressure: 1023
        }
    ])
    const saveForecast = (newWeather: IWeather) => {
        setForecasts([...forecasts, newWeather])
    }

    const [searchHints, setSearchHints] = React.useState<HintType[]>([])

    const saveSearchHints = (hints: HintType[]) => {
        setSearchHints(hints)
    }

    const [currentCity, setCurrentCity] = React.useState(0)

    const saveCurrentCity = (cityNumber: number) => {
        setCurrentCity(cityNumber)
    }

    return (
        <WeatherContext.Provider value={{searchHints, saveSearchHints, forecasts, saveForecast, currentCity, saveCurrentCity }}>
            { children }
        </WeatherContext.Provider>
    )
}
