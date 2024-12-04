import styles from "../../styles/components/Content.module.scss"
import sun from "/light_theme_icons/clear_day.svg"

interface ForecastWidgetProps {
    day: string;
    min: number;
    max: number;
}


export function ForecastWidget(props: ForecastWidgetProps) {
    return (
        <div className={ styles.forecast_widget }>
            <p className={ styles.forecast_day }>{props.day}</p>
            <img className={ styles.forecast_icon } src={ sun } alt="sun" />
            <div className={styles.forecast_temp}>{props.min}-{ props.max }</div>

        </div>
    )
}