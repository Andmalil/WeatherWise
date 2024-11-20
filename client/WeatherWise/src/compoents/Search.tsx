import {useRef, useState} from 'react'

import styles from '../styles/components/Search.module.scss'

import { Magnifier, ClearAll } from './icons'
import { SearchHints } from './SearchHints'


export function Search() {
    const searchRef = useRef<any>(null)
    const [searchValue, setSearchValue] = useState('')
    const onClean = () => {
        if (searchRef.current != null) {
            console.log(searchValue)
            searchRef.current.value = ''
            setSearchValue('')
            
        }
    }

    return (
        <>
        <div className={ styles.search_panel }>
            <button className={ styles.button }>
                <Magnifier className={ styles.magnifier_icon } />
            </button>
            <input ref={searchRef} placeholder='Search' type="text" className={ styles.search } onChange={e => setSearchValue(e.target.value)} />
            <button onClick={ onClean } className={ styles.clear_all_button }>
                <ClearAll className={ styles.clear_all_icon } />
            </button>
        </div>
        <SearchHints />
        </>
    )
}