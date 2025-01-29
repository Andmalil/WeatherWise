import styles from "../../styles/components/Content.module.scss"
import { ForecastWidget } from "./ForecastWidget"
import { weatherIcons } from "../../constants/charts"
import { useContext } from "react"
import { WeatherContext } from "../../context/weatherContext"
import { WeatherContextType } from "../../@types/weather"

export function Forecast() {
    const { forecasts, currentCity, currentUnits } = useContext(WeatherContext) as WeatherContextType
    const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    const currentTime = new Date()
    const forecastMinTemp = Math.round(Math.min(forecasts[currentCity].minTemps.today[currentUnits.temp], 
        forecasts[currentCity].minTemps.tomorrow[currentUnits.temp], 
        forecasts[currentCity].minTemps.thirdDay[currentUnits.temp]))

    const forecastMaxTemp = Math.round(Math.max(forecasts[currentCity].maxTemps.today[currentUnits.temp], 
        forecasts[currentCity].maxTemps.tomorrow[currentUnits.temp], 
        forecasts[currentCity].maxTemps.thirdDay[currentUnits.temp]))

    return (
        <div className={ styles.forecast }>
            <ForecastWidget 
            day="Today" 
            icon={ weatherIcons[forecasts[currentCity].forecastWeatherStatuses.today][1] } 
            minTemp={ Math.round(forecasts[currentCity].minTemps.today[currentUnits.temp]) } 
            maxTemp={ Math.round(forecasts[currentCity].maxTemps.today[currentUnits.temp]) }
            forecastMinTemp={ forecastMinTemp }
            forecastMaxTemp={ forecastMaxTemp }
            currentTemp={ forecasts[currentCity].currentTemp[currentUnits.temp] }/>
            
            <ForecastWidget 
            day="Tomorrow" 
            icon={ weatherIcons[forecasts[currentCity].forecastWeatherStatuses.tomorrow][1] } 
            minTemp={ Math.round(forecasts[currentCity].minTemps.tomorrow[currentUnits.temp]) } 
            maxTemp={ Math.round(forecasts[currentCity].maxTemps.tomorrow[currentUnits.temp]) }
            forecastMinTemp={ forecastMinTemp }
            forecastMaxTemp={ forecastMaxTemp }
            currentTemp={ null }/>

            <ForecastWidget 
            day={ weekdays[(currentTime.getDay()+2)%7] } 
            icon={ weatherIcons[forecasts[currentCity].forecastWeatherStatuses.thirdDay][1] } 
            minTemp={ Math.round(forecasts[currentCity].minTemps.thirdDay[currentUnits.temp]) } 
            maxTemp={ Math.round(forecasts[currentCity].maxTemps.thirdDay[currentUnits.temp]) }
            forecastMinTemp={ forecastMinTemp }
            forecastMaxTemp={ forecastMaxTemp }
            currentTemp={ null }/>
        </div>
    )
}