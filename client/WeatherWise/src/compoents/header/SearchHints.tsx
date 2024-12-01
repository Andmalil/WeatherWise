import { useEffect, useState } from "react"
import styles from "../../styles/components/Search.module.scss"

import { getSearchHints } from "../../api/SearchAPI";
// import { motion } from "framer-motion"
interface hintsProps {
    word: string;
    setInputValue: (value: string) => void;
}

export function SearchHints(props: hintsProps) {
    const [cities, setCities] = useState<{ID: number, Name: string, NameASCII: string, Lat: number, Lng: number, Country: string}[]>([])

    const onCityNameClick = (name: string) => {
        console.log(name)
        props.setInputValue(name)
    }
    const HintListLayout = cities.map((city) => 
        <li key={ city.ID } className={ styles.hintListItem }>
            <button onClick={ () => onCityNameClick(city.Name) }>{ city.Name } ({ city.Country })</button>
            </li>
    )

    useEffect(()=> {
        const Hints = async () => {
            const hintList = await getSearchHints(props.word)
            setCities(hintList)
        }
        Hints()
            
    }, [props.word])
    
    return (
        <div className={ styles.hints }>
        <div className={ styles.line }/>
            <ul className={ styles.hintList }>
                { HintListLayout }
            </ul>
        </div>
    )
}