import useInstructors from '../../hooks/useInstructors'
import ImageCard from '../common/ImageCard'
import styles from './InstructorsList.module.css'

export default function InstructorsList() {
  const { instructors } = useInstructors()

  return (
    <ul className={styles.list}>
      {instructors.map((instructor) => (
        <ImageCard
          key={instructor.name}
          name={instructor.name}
          url={instructor.photoPath}
          id={(instructor.id).toString()}
          type='instructor'
        />
      ))}
    </ul>
  )
}
