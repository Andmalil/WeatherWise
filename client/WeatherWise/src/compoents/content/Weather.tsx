import { WeatherScreen } from "./WeatherScreen"
import { HourlyForecastChartWidget } from "./HourlyForecastChartWidget"
import { WeatherWidgetMini } from "./WeatherWidgetMini"

import { UVChart } from "./charts/UVChart"
import { HumidityChart } from "./charts/HumidityChart"
import { RealFeelChart } from "./charts/RealFeelChart"
import { Compass } from "./charts/Compass"
import { PressureChart } from "./charts/PressureChart"

import styles from "../../styles/components/Content.module.scss"
import { useContext } from "react"
import { WeatherContext } from "../../context/weatherContext"
import { WeatherContextType } from "../../@types/weather"
import { SunCycleChart } from "./charts/SunCycleChart"
import { windDirections, timeFormat } from "../../constants/charts"

export function Weather() {
    const { forecasts, currentCity } = useContext(WeatherContext) as WeatherContextType

    const uvIndex = forecasts[currentCity].uvLevel
    var uvLevel = "Low"
    if (uvIndex <= 2) {
        uvLevel = "Low"
    } else if (3 <= uvIndex && uvIndex <= 5) {
        uvLevel = "Moderate"
    } else if (6 <= uvIndex && uvIndex <= 7) {
        uvLevel = "High"
    } else if (8 <= uvIndex && uvIndex <= 10) {
        uvLevel = "Very High"
    } else {
        uvLevel = "Extreme"
    }

    
    
    return (
        <div className={ styles.weather }>
            <WeatherScreen /> 
            <HourlyForecastChartWidget />
            
            
            { [{title: "UV", value: uvLevel, graphics: UVChart},
            {title: "Humidity", value: `${forecasts[currentCity].humidity}%`, graphics: HumidityChart},
            {title: "real feel", value: `${forecasts[currentCity].realFeel}°`, graphics: RealFeelChart},
            {title: windDirections[forecasts[currentCity].windDirection], value: `${forecasts[currentCity].windSpeed}`, graphics: Compass},
            {title: "Pressure", value: forecasts[currentCity].pressure.toString(), graphics: PressureChart},
            {title: forecasts[currentCity].isDay?"Sunset":"Sunrise", 
                value: forecasts[currentCity].isDay?timeFormat(forecasts[currentCity].sunset):timeFormat(forecasts[currentCity].sunrise), 
                graphics: SunCycleChart}
            ].map((g, index) => {
                return <WeatherWidgetMini key={ index } { ...g } />
            }) }
        </div>
    )
}