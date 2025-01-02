import {useRef, useState} from 'react'

import styles from '../../styles/components/Search.module.scss'

import { ClearAll, ClearAllHovered } from '../../assets/search_icons'
import { SearchHints } from './SearchHints'


export function Search() {
    const searchRef = useRef<any>(null)
    const [searchValue, setSearchValue] = useState('')
    const setInputValue = (value: string) => {
        searchRef.current.value = value
        setSearchValue(value)
        searchRef.current.focus()
    }

    const onClean = () => {
        if (searchRef.current != null) {
            setInputValue("")
        }
    }

    return (
        <>
        <div className={ styles.search_panel }>
            {/* <span className={ styles.button }>
                <Magnifier className={ styles.magnifier_icon } />
                <MagnifierHovered className= { styles.magnifier_hovered_icon } />
            </span> */}
            <input ref={searchRef} placeholder='Search' type="text" className={ styles.search } onChange={e => setSearchValue(e.target.value)} />
            <button onClick={ onClean } className={ styles.clear_all_button }>
                <ClearAll className={ styles.clear_all_icon } />
                <ClearAllHovered className={styles.clear_all_hovered_icon} />
            </button>
        </div>
        <SearchHints word={ searchValue } setInputValue={ setInputValue } />
        </>
    )
}