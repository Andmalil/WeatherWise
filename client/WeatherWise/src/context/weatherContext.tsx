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
            uvLevel: 5,
            humidity: 89,
            windDirection: "WNW",
            windDegree: 287,
            windSpeed: 14.8,
            pressure: 1023,
            sunrise: 720,
            sunset: 1380,
            timezone: "Europe/London",
            maxTemps: {
                today: 2,
                tomorrow: 10,
                thirdDay: -25
            },
            minTemps: {
                today: 4,
                tomorrow: 125,
                thirdDay: -88
            },
            forecastWeatherStatuses: {
                today: 1003,
                tomorrow: 1009,
                thirdDay: 1003
            }
        }
    ])
    const saveForecast = (newWeather: IWeather) => {
        setForecasts([newWeather])
    }

    const [searchHints, setSearchHints] = React.useState<HintType[]>([])

    const saveSearchHints = (hints: HintType[]) => {
        setSearchHints(hints)
    }

    const [currentCity, setCurrentCity] = React.useState(0)

    const saveCurrentCity = (cityNumber: number) => {
        console.log("City number: ", cityNumber)
        setCurrentCity(0)
    }

    return (
        <WeatherContext.Provider value={{searchHints, saveSearchHints, forecasts, saveForecast, currentCity, saveCurrentCity }}>
            { children }
        </WeatherContext.Provider>
    )
}
