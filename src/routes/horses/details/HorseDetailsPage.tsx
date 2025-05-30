import styles from './HorseDetailsPage.module.css'
import { useHorses } from '../../../hooks/useHorses'

export default function HorseDetailsPage() {
  const { currentHorse } = useHorses()

  if (!currentHorse) {
    return <p className={styles.error}>Упс! :(</p>
  }

  return (
    <section className={styles.page}>
      <h1 className={styles.name}>{currentHorse.name}</h1>
      <p className={styles.age}>Възраст - {currentHorse.age}г.</p>
      <p className={styles.description}>{currentHorse.description}</p>
      <div className={styles.gallery}>
        {currentHorse.imagePaths.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`${currentHorse.name} ${idx + 1}`}
            className={styles.image}
          />
        ))}
      </div>
    </section>
  )
}
