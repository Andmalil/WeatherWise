import { ComponentType, ComponentProps } from 'react'

import styles from "../../styles/components/Content.module.scss"

interface WidgetProps {
    title: string
    value: string
    graphics: ComponentType<ComponentProps<"canvas">>
    
}

export function WeatherWidgetMini(props: WidgetProps) {
    return (
        <div className={ styles.weather_widget_mini }>
             <div className={ styles.mini_widget_text }>
                 <p className={ styles.mini_widget_title }>{ props.title }</p>
                 <p className={ styles.mini_widget_value }>{ props.value }</p>
             </div>
            
            <props.graphics width="100px" height="100px" className={ styles.mini_widget_chart } />
        </div>
        
    )
}