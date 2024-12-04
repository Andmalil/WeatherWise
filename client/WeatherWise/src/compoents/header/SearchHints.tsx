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

    const onCityNameClick = (name: string, country: string, id: number) => {
        console.log(id)
        props.setInputValue(`${name} (${country})`)
    }
    const HintListLayout = cities.map((city) => 
        <li key={ city.ID } className={ styles.hintListItem }>
            <button onClick={ () => onCityNameClick(city.Name, city.Country, city.ID) }>{ city.Name } ({ city.Country })</button>
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