import styles from './OurHorses.module.css'
import texts from '../../texts.json'
import HorsesList from '../horses/HorsesList'

export default function OurHorses() {
  return (
    <main className={styles.main}>
      <h1>{texts['our-horses']}</h1>
      <p className={styles.desc}>{texts['our-horses-desc']}</p>
      <HorsesList />
      <button className={styles.see__more}>{texts['see-more']}</button>
    </main>
  )
}
