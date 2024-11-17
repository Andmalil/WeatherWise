import styles from '../styles/components/Search.module.scss'


export function Search() {
    return (
        <div>
            <button className={ styles.button }></button>
            <input type="text"/>
        </div>
    )
}