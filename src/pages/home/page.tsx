import { useUnit } from "effector-react"
import { $search, searchChanged } from "./model"

import styles from "./style.module.css"

export const Page = () => {
    const [value, onChange] = useUnit([$search, searchChanged])

    return (
        <main className={styles.main}>
            <h1>hello</h1>

            <label htmlFor="" className={styles.label}>
                <span>search</span>
                <input
                    type="text"
                    className={styles.input}
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                />
            </label>
        </main>
    )
}
