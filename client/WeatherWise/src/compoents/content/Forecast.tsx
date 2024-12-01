import styles from "../../styles/components/Content.module.scss"
import { ClearDayLight, PartlyCloudDayLight, WindyLight, StormLight, ClearNightLight, PartlyCloudyNightLight, CloudyLight, FogLight, RainLight, SnowLight, SleetLight, DropLight } from "../../assets/weather_icons"

export function Forecast() {
    return (
        <div className={ styles.forecast }>
            <ClearDayLight className={ styles.sunny_icon } />
            <PartlyCloudDayLight className={ styles.sunny_icon } />
            <WindyLight className={ styles.sunny_icon } />
            <StormLight className={ styles.sunny_icon } />
            <ClearNightLight className={ styles.sunny_icon } />
            <PartlyCloudyNightLight className={ styles.sunny_icon } />
            <CloudyLight className={ styles.sunny_icon } />
            <FogLight className={ styles.sunny_icon } />
            <RainLight className={ styles.sunny_icon } />
            <SnowLight className={ styles.sunny_icon } />
            <SleetLight className={ styles.sunny_icon } />
            <DropLight className={ styles.sunny_icon } />
        </div>
    )
}