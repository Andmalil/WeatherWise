import * as React from "react";
import {  IWeather, HintType, WeatherContextType, UnitsType } from "../@types/weather"


export const WeatherContext = React.createContext<WeatherContextType | null>(null)

export const WeatherProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [forecasts, setForecasts] = React.useState<IWeather[]>([])
    const saveForecast = (newWeather: IWeather) => {
        setForecasts([newWeather])
    }

    const [searchHints, setSearchHints] = React.useState<HintType[]>([])

    const saveSearchHints = (hints: HintType[]) => {
        setSearchHints(hints)
    }

    const [currentCity, setCurrentCity] = React.useState(0)

    const saveCurrentCity = () => {
        setCurrentCity(0)
    }

    const [currentUnits, setCurrentUnits] = React.useState<UnitsType>({temp: "c", wind: "kph", press: "mbar"})

    const saveCurrentUnits = (temp: string|null, wind: string|null, press: string|null) => { 
        if (!temp) {
            temp = currentUnits.temp
        }

        if (!wind) {
            wind = currentUnits.wind
        }

        if (!press) {
            press = currentUnits.press
        }
        setCurrentUnits({temp: temp, wind: wind, press: press})

    }

    return (
        <WeatherContext.Provider value={{searchHints, saveSearchHints, forecasts, saveForecast, currentCity, saveCurrentCity, currentUnits, saveCurrentUnits }}>
            { children }
        </WeatherContext.Provider>
    )
}
