import styles from "../../styles/components/Content.module.scss"

import { HourlyForecastChart } from "./charts/HourlyForecastChart";


export function HourlyForecastChartWidget() {
    return (
        <div className={ `${ styles.weather_widget } ${ styles.weather_chart }` }>
            <p className={ styles.forecast_chart_label }>24-hour forecast</p>
            <HourlyForecastChart className={ styles.chart } width="1200px" height="255px"/>
        </div>
    )
}