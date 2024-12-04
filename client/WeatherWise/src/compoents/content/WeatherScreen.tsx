import styles from "../../styles/components/Content.module.scss"

import { useEffect, useState } from "react"

import clear_day from "/light_theme_icons/clear_day.svg"


export function WeatherScreen() {
    const [status, setStatus] = useState("Clear")
    const [temperature, setTemperature] = useState(28)
    const [feelLike, setFeelLike] = useState(37)
    const [currentCity, setCurrentCity] = useState("Moscow")

    var [currentTime, setCurrentTime] = useState(new Date())
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date())
            if (status == "Clear") {
                setStatus("Snow")
            } else {
                setStatus("Clear")
            }
            
            if (temperature == 28) {
                setTemperature(3)
            } else {
                setTemperature(28)
            }
            if (feelLike == 37) {
                setFeelLike(2)
            } else {
                setFeelLike(37)
            }

            if (currentCity == "Moscow") {
                setCurrentCity("Los angeles")
            } else {
                setCurrentCity("Moscow")
            }
        }, 1000)
        return () => clearInterval(intervalId)
    }, [])
    const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    const now = new Date()
    
    return (
        <div className={`${styles.weather_widget} ${styles.weather_screen}`}>
            <div className={ styles.current_weather }>
            <div className={ styles.status }>
                <img className={ styles.weather_icon } src={ clear_day }/>
                <div>{ status }</div>
            </div>
            <p className={ styles.temerature }>{ temperature }°</p>
            <p className={ styles.feel_like }>feel like { feelLike }°</p>
            </div>
            <div className={ styles.time_and_city }>
                <p className={ styles.city_name }>{ currentCity }</p>
                <p className={ styles.current_time }>{ weekdays[now.getDay()] } { currentTime.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"}) }</p>
            </div>
        </div>
    )
}