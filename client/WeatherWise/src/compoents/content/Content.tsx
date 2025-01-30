import styles from "../../styles/components/Content.module.scss"

import { Weather } from "./Weather"
import { Forecast } from "./Forecast"
import { useContext } from "react"
import { WeatherContext } from "../../context/weatherContext"
import { WeatherContextType } from "../../@types/weather"


export function Content() {
    const { forecasts } = useContext(WeatherContext) as WeatherContextType
    return (
        <main className={ styles.content }>
            {forecasts.length > 0
            ? <><Weather /><Forecast /></>
            : ""
            }
        </main>
    )
}