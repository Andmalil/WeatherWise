import styles from "../../styles/components/Content.module.scss"
import { ForecastTempRange } from "./charts/ForecastTempRange";

interface ForecastWidgetProps {
    day: string;
    minTemp: number;
    maxTemp: number;
    forecastMinTemp: number,
    forecastMaxTemp: number,
    currentTemp: number | null,
    icon: string;
}


export function ForecastWidget(props: ForecastWidgetProps) {

    return (
        <div className={ styles.forecast_widget }>
            <p className={ styles.forecast_day }>{props.day}</p>
            <img className={ styles.forecast_icon } src={ props.icon } alt="sun" />
            <div className={styles.forecast_temp}>{props.minTemp}° 
                <ForecastTempRange 
                className={ styles.forecast_temp_range } 
                width="50px" height="8px" 
                minTemp={ props.minTemp } maxTemp={ props.maxTemp }
                forecastMinTemp={ props.forecastMinTemp } forecastMaxTemp={ props.forecastMaxTemp }
                currentTemp={ props.currentTemp }/> 
                { props.maxTemp }°
                </div>

        </div>
    )
}