import styles from "../../styles/components/Content.module.scss"
import { ForecastWidget } from "./ForecastWidget"

export function Forecast() {
    return (
        <div className={ styles.forecast }>
            <ForecastWidget day="Yesterday" min={3} max={6}/>
            <ForecastWidget day="Today" min={3} max={6}/>
            <ForecastWidget day="Tomorrow" min={3} max={6}/>
        </div>
    )
}