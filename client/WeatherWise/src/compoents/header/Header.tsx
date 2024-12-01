import { Search } from './Search.tsx'
import styles from '../../styles/components/Header.module.scss'

export function Header() {
    return (
        <header className={ styles.header }>
            <Search />
        </header>
    )
}