import InstructorItem from './InstructorItem'
import styles from './InstructorsList.module.css'

const INSTRUCTORS = [
  { name: 'Виктория', url: '/public/images/instructors-avatars/vicky.png' },
  { name: 'Борис', url: '/public/images/instructors-avatars/boris.jpg' },
  { name: 'Ева', url: '/public/images/instructors-avatars/eva.jpg' },
  { name: 'Ивайло', url: '/public/images/instructors-avatars/ivaylo.jpg' },
  { name: 'Павлета', url: '/public/images/instructors-avatars/pavleta.jpg' },
]

export default function InstructorsList() {
  const topRow = INSTRUCTORS.slice(0, 3)
  const bottomRow = INSTRUCTORS.slice(3)

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {topRow.map((instructor) => (
          <InstructorItem key={instructor.name} {...instructor} />
        ))}
      </ul>
      <ul className={`${styles.list} ${styles.bottomRow}`}>
        {bottomRow.map((instructor) => (
          <InstructorItem key={instructor.name} {...instructor} />
        ))}
      </ul>
    </div>
  )
}
