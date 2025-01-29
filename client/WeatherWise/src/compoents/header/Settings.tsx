import { useContext, useRef } from "react"
import styles from "../../styles/components/Settings.module.scss"
import { WeatherContext } from "../../context/weatherContext"
import { WeatherContextType } from "../../@types/weather"

export function Settings() {
    const tempUnitRef = useRef<HTMLSelectElement>(null)
    const windSpeedUnitRef = useRef<HTMLSelectElement>(null)
    const pressureUnitRef = useRef<HTMLSelectElement>(null)

    const { saveCurrentUnits, currentUnits } = useContext(WeatherContext) as WeatherContextType

    const unitChange = (field: string) => {
        
        if (tempUnitRef && windSpeedUnitRef && pressureUnitRef) {
            if (tempUnitRef.current && windSpeedUnitRef.current && pressureUnitRef.current) {
                switch (field) {
                    case "temp": 
                        saveCurrentUnits(tempUnitRef.current.value, null, null);
                        break;
                    case "wind": 
                        saveCurrentUnits(null, windSpeedUnitRef.current.value, null);
                        break;
                    case "press": 
                        saveCurrentUnits(null, null, pressureUnitRef.current.value);
                        break;
                }
            }
        }
    }
    return (
    <div className={ styles.settings }>
    <select ref={ tempUnitRef } className={ styles.settings_button } size={ 1 } defaultValue={currentUnits.temp} onChange={()=>unitChange("temp")}> 
        <option value="c">°C</option>
        <option value="f">°F</option>
    </select>
    <select ref={ windSpeedUnitRef } className={`${styles.settings_button}`} size={ 1 } defaultValue={currentUnits.wind} onChange={()=>unitChange("wind")}> 
    <option value="kph">km/h</option>
    <option value="mph">mph</option>
    </select>
    <select ref={ pressureUnitRef } className={ styles.settings_button } size={ 1 } defaultValue={currentUnits.press} onChange={()=>unitChange("press")}> 
    <option value="mbar">mbar</option>
    <option value="inhg">inHg</option>
    </select>
    </div>
    )
}