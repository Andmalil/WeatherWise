import styles from "../../styles/components/Content.module.scss"

import { useContext, useEffect, useState } from "react"


import { WeatherContextType } from "../../@types/weather"
import { WeatherContext } from "../../context/weatherContext"
import { weatherIcons } from "../../constants/charts"




export function WeatherScreen() {
    const { forecasts, currentCity } = useContext(WeatherContext) as WeatherContextType

    var [currentTime, setCurrentTime] = useState(new Date())
    useEffect(() => {
        const intervalId = setInterval(() => {
            var time = new Date()
            setCurrentTime(time)
            
        }, 1000)
        return () => clearInterval(intervalId)
    }, [])
    const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    
    return (
        <div className={`${styles.weather_widget} ${styles.weather_screen}`}>
            <div className={ styles.current_weather }>
            <div className={ styles.status }>
                <img className={ styles.weather_icon } src={ weatherIcons[forecasts[currentCity].iconId][forecasts[currentCity].isDay] }/>
                <div>{ forecasts[currentCity].weatherStatus }</div>
            </div>
            <p className={ styles.temerature }>{ forecasts[currentCity].currentTemp }°</p>
            </div>
            <div className={ styles.time_and_city }>
                <p className={ styles.city_name }>{ forecasts[currentCity].cityName }</p>
                <p className={ styles.current_time }>{ weekdays[currentTime.getDay()] } { currentTime.toLocaleTimeString([], {timeZone: forecasts[currentCity].timezone, hour: "2-digit", minute: "2-digit"}) }</p>
            </div>
        </div>
    )
}