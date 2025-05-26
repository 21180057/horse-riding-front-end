import ImageCard from '../common/ImageCard'
import styles from './InstructorsList.module.css'
import { INSTRUCTORS } from '../../data/instructors'

export default function InstructorsList() {
  const topRow = INSTRUCTORS.slice(0, 3)
  const bottomRow = INSTRUCTORS.slice(3)

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {topRow.map((instructor) => (
          <ImageCard key={instructor.name} name={instructor.name} url={instructor.url} />
        ))}
      </ul>
      <ul className={`${styles.list} ${styles.bottomRow}`}>
        {bottomRow.map((instructor) => (
          <ImageCard key={instructor.name} name={instructor.name} url={instructor.url} />
        ))}
      </ul>
    </div>
  )
}
