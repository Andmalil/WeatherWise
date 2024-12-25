import styles from "../../styles/components/Content.module.scss"

import { useContext, useEffect, useState } from "react"

import clear_day from "/light_theme_icons/clear_day.svg"
import clear_night from "/light_theme_icons/clear_night.svg"
import partly_cloudy_day from "/light_theme_icons/partly_cloudy_day.svg"
import partly_cloudy_night from "/light_theme_icons/partly_cloudy_night.svg"
import cloudy from "/light_theme_icons/cloudy.svg"
import fog from "/light_theme_icons/fog.svg"
import rain from "/light_theme_icons/rain.svg"
import sleet from "/light_theme_icons/sleet.svg"
import snow from "/light_theme_icons/snow.svg"
import storm from "/light_theme_icons/storm.svg"


import { WeatherContextType } from "../../@types/weather"
import { WeatherContext } from "../../context/weatherContext"




export function WeatherScreen() {
    const { forecasts, currentCity } = useContext(WeatherContext) as WeatherContextType

    const weatherIcons: { [key: number]: string[] } = {
        1000: [clear_night, clear_day],
        1003: [partly_cloudy_night, partly_cloudy_day],
        1006: [cloudy, cloudy],
        1009: [cloudy, cloudy],
        1030: [fog, fog],
        1063: [rain, rain],
        1066: [snow, snow], 
        1069: [sleet, sleet],
        1072: [rain, rain], 
        1087: [storm, storm],
        1114: [snow, snow],
        1117: [snow, snow], 
        1135: [fog, fog],
        1147: [fog, fog], 
        1150: [rain, rain],
        1153: [rain, rain],
        1168: [rain, rain],
        1171: [rain, rain],
        1180: [rain, rain],
        1183: [rain, rain],
        1186: [rain, rain],
        1189: [rain, rain],
        1192: [rain, rain],
        1195: [rain, rain],
        1198: [rain, rain],
        1201: [rain, rain],
        1204: [sleet, sleet], 
        1207: [sleet, sleet], 
        1210: [snow, snow],
        1213: [snow, snow],
        1216: [snow, snow],
        1219: [snow, snow],
        1222: [snow, snow],
        1225: [snow, snow],
        1237: [snow, snow],
        1240: [rain, rain],
        1243: [rain, rain],
        1246: [rain, rain],
        1249: [sleet, sleet],
        1252: [sleet, sleet],
        1255: [snow, snow],
        1258: [snow, snow],
        1261: [snow, snow],
        1264: [snow, snow], 
        1273: [storm, storm],
        1276: [storm, storm],
        1279: [storm, storm],
        1282: [storm, storm]


    }

    var [currentTime, setCurrentTime] = useState(new Date())
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date())
            
        }, 1000)
        return () => clearInterval(intervalId)
    }, [])
    const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    const now = new Date()
    
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
                <p className={ styles.current_time }>{ weekdays[now.getDay()] } { currentTime.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"}) }</p>
            </div>
        </div>
    )
}