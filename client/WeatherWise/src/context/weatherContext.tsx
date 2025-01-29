import * as React from "react";
import {  IWeather, HintType, WeatherContextType, UnitsType } from "../@types/weather"


export const WeatherContext = React.createContext<WeatherContextType | null>(null)

export const WeatherProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [forecasts, setForecasts] = React.useState<IWeather[]>([
        {
            id: 1,
            iconId: 1000,
            isDay: 0,
            cityName: "Moscow",
            weatherStatus: "Moderate or heavy showers of ice pellets",
            currentTemp: {"c": 2, "f": 20},
            realFeel: {"c": -50, "f": -500},
            hourForecast: [[
                {temp: {c: 1, f: 10}, wind: {kph: 13, mph: 14}, weather: 1000},
                {temp: {c: 2, f: 20}, wind: {kph: 13, mph: 14}, weather: 1000},
                {temp: {c: 3, f: 30}, wind: {kph: 13, mph: 14}, weather: 1000},
                {temp: {c: 4, f: 40}, wind: {kph: 13, mph: 14}, weather: 1000},
                {temp: {c: 5, f: 50}, wind: {kph: 13, mph: 14}, weather: 1000},
                {temp: {c: 4, f: 40}, wind: {kph: 13, mph: 14}, weather: 1000},
                {temp: {c: 3, f: 30}, wind: {kph: 13, mph: 14}, weather: 1000},
                {temp: {c: 2, f: 20}, wind: {kph: 13, mph: 14}, weather: 1000},
                {temp: {c: 1, f: 10}, wind: {kph: 13, mph: 14}, weather: 1000},
                {temp: {c: 0, f: 10}, wind: {kph: 13, mph: 14}, weather: 1000},
                {temp: {c: -1, f: -11}, wind: {kph: 13, mph: 14}, weather: 1000},
                {temp: {c: -2, f: -20}, wind: {kph: 13, mph: 14}, weather: 1000},
                {temp: {c: -2, f: -20}, wind: {kph: 13, mph: 14}, weather: 1000},
                {temp: {c: -3, f: -30}, wind: {kph: 13, mph: 14}, weather: 1000},
                {temp: {c: -4, f: -40}, wind: {kph: 13, mph: 14}, weather: 1000},
                {temp: {c: -5, f: -50}, wind: {kph: 13, mph: 14}, weather: 1000},
                {temp: {c: -4, f: -40}, wind: {kph: 13, mph: 14}, weather: 1000},
                {temp: {c: -2, f: -20}, wind: {kph: 13, mph: 14}, weather: 1000},
                {temp: {c: 0, f: 10}, wind: {kph: 13, mph: 14}, weather: 1000},
                {temp: {c: 2, f: 20}, wind: {kph: 13, mph: 14}, weather: 1000},
                {temp: {c: 4, f: 40}, wind: {kph: 13, mph: 14}, weather: 1000},
                {temp: {c: 6, f: 60}, wind: {kph: 13, mph: 14}, weather: 1000},
                {temp: {c: 5, f: 50}, wind: {kph: 13, mph: 14}, weather: 1000},
                {temp: {c: 3, f: 30}, wind: {kph: 13, mph: 14}, weather: 1000}
            ],
            [
                {temp: {c: 1, f: 10}, wind: {kph: 13, mph: 14}, weather: 1000},
                {temp: {c: 2, f: 20}, wind: {kph: 13, mph: 14}, weather: 1000},
                {temp: {c: 3, f: 30}, wind: {kph: 13, mph: 14}, weather: 1000},
                {temp: {c: 4, f: 40}, wind: {kph: 13, mph: 14}, weather: 1000},
                {temp: {c: 5, f: 50}, wind: {kph: 13, mph: 14}, weather: 1000},
                {temp: {c: 4, f: 40}, wind: {kph: 13, mph: 14}, weather: 1000},
                {temp: {c: 3, f: 30}, wind: {kph: 13, mph: 14}, weather: 1000},
                {temp: {c: 2, f: 20}, wind: {kph: 13, mph: 14}, weather: 1000},
                {temp: {c: 1, f: 10}, wind: {kph: 13, mph: 14}, weather: 1000},
                {temp: {c: 0, f: 10}, wind: {kph: 13, mph: 14}, weather: 1000},
                {temp: {c: -1, f: -11}, wind: {kph: 13, mph: 14}, weather: 1000},
                {temp: {c: -2, f: -20}, wind: {kph: 13, mph: 14}, weather: 1000},
                {temp: {c: -2, f: -20}, wind: {kph: 13, mph: 14}, weather: 1000},
                {temp: {c: -3, f: -30}, wind: {kph: 13, mph: 14}, weather: 1000},
                {temp: {c: -4, f: -40}, wind: {kph: 13, mph: 14}, weather: 1000},
                {temp: {c: -5, f: -50}, wind: {kph: 13, mph: 14}, weather: 1000},
                {temp: {c: -4, f: -40}, wind: {kph: 13, mph: 14}, weather: 1000},
                {temp: {c: -2, f: -20}, wind: {kph: 13, mph: 14}, weather: 1000},
                {temp: {c: 0, f: 10}, wind: {kph: 13, mph: 14}, weather: 1000},
                {temp: {c: 2, f: 20}, wind: {kph: 13, mph: 14}, weather: 1000},
                {temp: {c: 4, f: 40}, wind: {kph: 13, mph: 14}, weather: 1000},
                {temp: {c: 6, f: 60}, wind: {kph: 13, mph: 14}, weather: 1000},
                {temp: {c: 5, f: 50}, wind: {kph: 13, mph: 14}, weather: 1000},
                {temp: {c: 3, f: 30}, wind: {kph: 13, mph: 14}, weather: 1000}
            ]
            ],
            uvLevel: 5,
            humidity: 89,
            windDirection: "WNW",
            windDegree: 287,
            windSpeed: {"kph": 14.6, "mph": 20.3},
            pressure: {"mbar": 1038, "inhg": 30.65},
            sunrise: 720,
            sunset: 1380,
            timezone: "Europe/London",
            maxTemps: {
                today: {"c": 5, "f": 50},
                tomorrow: {"c": 4, "f": 40},
                thirdDay: {"c": 11, "f": 110}
            },
            minTemps: {
                today: {"c": 0, "f": 10},
                tomorrow: {"c": 1, "f": 10},
                thirdDay: {"c": 1, "f": 10}
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
