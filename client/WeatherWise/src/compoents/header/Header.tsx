import { Search } from './Search.tsx'
import styles from '../../styles/components/Header.module.scss'
import { Settings } from './Settings.tsx'

export function Header() {
    // Header of the web application
    return (
        <header className={ styles.header }>
            <div className={ styles.header_content }>
            <Search />
            <Settings />
            </div>
        </header>
    )
}