import { useEffect, useState } from "react"
import styles from "../styles/components/Search.module.scss"

import { getSearchHints } from "../api/SearchAPI";
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
    const HintList = cities.map((city) => 
        <li key={ city.ID } className={ styles.hintListItem }>
            <button onClick={ () => onCityNameClick(city.Name) }>{ city.Name } ({ city.Country })</button>
            </li>
    )

    // const fetchCitiesNames = async () => {
    //     const url = `http://127.0.0.1:3000/citysearch/${props.word}`
    //     console.log(url)
    //     try {
    //         const response = await fetch(url, {method: "GET"})
    //         if (!response.ok) {
    //             throw new Error(`Response status: ${response.status}`)
    //         }
    //         const data = await response.json()
    //         if (data) {
    //         setCities(data)
    //         } else {
    //             setCities([])
    //         }
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }

    

    useEffect(()=> {
        if (props.word.length > 0) {
            const hints = async () => {
                const h = await getSearchHints(props.word)
                setCities(h)
            }
            hints()
            
    } else {setCities([])}
    }, [props.word])
    
    return (
        <>
        
        <div className={ styles.hints }>
        <div className={ styles.line }/>
            <ul className={ styles.hintList }>
                { HintList }
            </ul>
        </div>
        </>
    )
}