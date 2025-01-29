import { RefObject, useContext, useEffect } from "react"
import styles from "../../styles/components/Search.module.scss"

import { getSearchHints, getWeather } from "../../api/SearchAPI";
import { WeatherContextType } from "../../@types/weather";
import { WeatherContext } from "../../context/weatherContext"
// import { motion } from "framer-motion"
interface hintsProps {
    word: string;
    setInputValue: (value: string) => void;
    searchRef: RefObject<HTMLInputElement>;
}

export function SearchHints(props: hintsProps) {
    const { searchHints, saveSearchHints, forecasts, saveForecast, saveCurrentCity } = useContext(WeatherContext) as WeatherContextType

    const onCityNameClick = (name: string, country: string, id: number, searchRef: RefObject<HTMLInputElement>) => {
        props.setInputValue(`${name} (${country})`)
        const search = searchRef.current
        if (search) {
            search.blur()
        }
        getWeather(id, forecasts.length, saveForecast, saveCurrentCity)
    }
    const HintListLayout = searchHints.map((city) => 
        <li key={ city.ID } className={ styles.hintListItem }>
            <button onClick={ () => onCityNameClick(city.Name, city.Country, city.ID, props.searchRef) }>{ city.Name } ({ city.Country })</button>
        </li>
    )

    useEffect(()=> {
        getSearchHints(props.word, saveSearchHints)
    }, [props.word])
    
    return (
        <div className={ styles.hints }>
        <div className={ styles.line }/>
            <ul className={ styles.hintList }>
                { HintListLayout.length> 0 ? HintListLayout : <p>Nothing is found</p> }
            </ul>
        </div>
    )
}