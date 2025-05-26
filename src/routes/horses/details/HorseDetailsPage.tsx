import { useParams } from 'react-router-dom'
import styles from './HorseDetailsPage.module.css'
import { HORSES } from '../../../data/horses'

export default function HorseDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const horse = HORSES.find(horse => horse.id === id)

  if (!horse) {
    return <p className={styles.error}>Упс! :(</p>
  }

  return (
    <section className={styles.page}>
      <h1 className={styles.name}>{horse.name}</h1>
      <p className={styles.age}>Възраст - {horse.age}г.</p>
      <p className={styles.description}>{horse.description}</p>
      <div className={styles.gallery}>
        {horse.imagePaths.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`${horse.name} ${idx + 1}`}
            className={styles.image}
          />
        ))}
      </div>
    </section>
  )
}
