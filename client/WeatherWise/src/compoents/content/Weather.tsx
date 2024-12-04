import { WeatherScreen } from "./WeatherScreen"
import { WeatherChart } from "./WeatherChart"
import { WeatherWidgetMini } from "./WeatherWidgetMini"

import styles from "../../styles/components/Content.module.scss"

export function Weather() {
    return (
        <div className={ styles.weather }>
            <WeatherScreen />
            <WeatherChart />
            
            { [1, 2, 3, 4, 5, 6, 7, 8].map((v) => {
                return <WeatherWidgetMini key={ v } />
            }) }
        </div>
    )
}