import { useState } from 'react'
import styles from './InstructorsPage.module.css'
import { INSTRUCTORS } from '../../data/instructors'

export default function OurInstructorsPage() {
  const [loaded, setLoaded] = useState<boolean[]>(Array(INSTRUCTORS.length).fill(false))

  const handleImageLoad = (index: number) => {
    setLoaded((prev) => {
      const updated = [...prev]
      updated[index] = true
      return updated
    })
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Нашите инструктори</h1>
      <div className={styles.grid}>
        {INSTRUCTORS.map((instructor, index) => (
          <div key={instructor.name} className={styles.card}>
            <div className={styles.imageWrapper}>
              {!loaded[index] && <div className={styles.spinner} />}
              <img
                src={instructor.url}
                alt={instructor.name}
                className={`${styles.photo} ${loaded[index] ? styles.visible : styles.hidden}`}
                onLoad={() => handleImageLoad(index)}
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
  )
}
