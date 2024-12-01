import styles from "../../styles/components/Content.module.scss"

import { Weather } from "./Weather"
import { Forecast } from "./Forecast"


export function Content() {
    return (
        <main className={ styles.content }>
            <Weather />
            <Forecast />
        </main>
    )
}