import styles from "../../styles/components/Content.module.scss"

import { ForecastChart } from "./charts/ForecastChart";


export function WeatherChart() {
    return (
        <div className={ `${ styles.weather_widget } ${ styles.weather_chart }` }>
            <ForecastChart />
        </div>
    )
}