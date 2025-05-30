import styles from './InstructorsPage.module.css'
import useInstructors from '../../hooks/useInstructors'

export default function OurInstructorsPage() {
  const { instructors, isLoading } = useInstructors()

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Нашите инструктори</h1>
      <div className={styles.grid}>
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.imageWrapper}>
                <div className={styles.spinner} />
              </div>
              <div className={styles.info}>
                <div className={styles.skeletonText} />
                <div className={styles.skeletonText} />
              </div>
            </div>
          ))
          : instructors.map((instructor) => (
            <div key={instructor.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <img
                  src={instructor.photoPath}
                  alt={instructor.name}
                  className={styles.photo}
                />
              </div>
              <div className={styles.info}>
                <h2 className={styles.name}>{instructor.name}</h2>
                <p className={styles.description}>{instructor.description}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
