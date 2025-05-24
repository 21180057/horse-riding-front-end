import styles from './OurInstructors.module.css'
import texts from '../../texts.json'
import InstructorsList from './InstructorsList'

export default function OurInstructors() {
  return (
    <main className={styles.main}>
      <h1>{texts['our-instructors']}</h1>
      <p className={styles.desc}>{texts['our-instructors-desc']}</p>
      <InstructorsList />
      <button className={styles.see__more}>{texts['see-more']}</button>
    </main>
  )
}
