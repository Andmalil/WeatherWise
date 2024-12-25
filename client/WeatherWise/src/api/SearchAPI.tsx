import { HintType } from "../@types/weather"
import { IWeather } from "../@types/weather"


export async function getSearchHints(word: string, saveSearchHints: (hints: HintType[])=>void) {
    if (!word.length) {
        saveSearchHints([])
        return
    }

    const url = `http://127.0.0.1:3000/citysearch/${word}`
        try {
            const response = await fetch(url, {method: "GET"})
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`)
            }
            const data = await response.json()
            if (data) {
                saveSearchHints(data)
                return
            }
            
        } catch (error) {
            saveSearchHints([])
            console.error(error)
            return
        }
        saveSearchHints([])
}


export async function getWeather(id: number, forecastsCount: number, saveForecast: (newWeather: IWeather) => void, saveCurrentCity: (cityNumber: number) => void) {
    const url = `http://127.0.0.1:3000/search/${id}`
    try {
        const response = await fetch(url, {method: "GET"})
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`)
        }

        const data = await response.json()
        
        if (data) {
            var forecastData: number[] = []
            for (var i=0; i<data.forecast.forecastday[0].hour.length; i++) {
                forecastData.push(data.forecast.forecastday[0].hour[i].temp_c)
            }
            saveForecast({
                id: id,
                iconId: data.current.condition.code,
                isDay: data.current.is_day,
                cityName: data.location.name,
                weatherStatus: data.current.condition.text,
                currentTemp: Math.round(data.current.temp_c),
                realFeel: Math.round(data.current.feelslike_c),
                tempUnits: "c",
                hourForecast: forecastData,
                uvLevel: data.current.uv,
                humidity: data.current.humidity,
                windDirection: data.current.wind_dir,
                windDegree: data.current.wind_degree,
                windSpeed: data.current.wind_kph,
                pressure: data.current.pressure_mb
            })

            
            saveCurrentCity(forecastsCount)
            
        }
        
    } catch (error) {
        console.error(error)
    }

    return null
}