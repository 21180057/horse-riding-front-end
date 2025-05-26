import { useState } from 'react'
import styles from './HorsesPage.module.css'

import { HORSES } from '../../data/horses'
import { useNavigate } from 'react-router-dom'

export default function HorsesPage() {
  const navigate = useNavigate()
  const [loaded, setLoaded] = useState<boolean[]>(Array(HORSES.length).fill(false))

  const handleImageLoad = (index: number) => {
    setLoaded((prev) => {
      const updated = [...prev]
      updated[index] = true
      return updated
    })
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Нашите коне</h1>
      <p style={{ color: '#111' }}>
        Тези коне предлагат уникални преживявания за всеки ездач, като всеки от тях
        има своето неповторимо очарование и характер! Ако искате да видите и
        другите наши коне заповядайте, очакваме ви!
      </p>
      <div className={styles.grid}>
        {HORSES.map((horse, index) => (
          <div onClick={() => navigate(`/horses/${horse.id}`)} key={horse.name} className={`${styles.card} ${styles.horseCard}`}>
            <div className={styles.imageWrapper}>
              {!loaded[index] && <div className={styles.spinner} />}
              <img
                src={horse.imagePaths[0]}
                alt={horse.name}
                className={`${styles.photo} ${loaded[index] ? styles.visible : styles.hidden}`}
                onLoad={() => handleImageLoad(index)}
              />
            </div>
            <div className={styles.info}>
              <h2 className={styles.name}>{horse.name}</h2>
              <p className={styles.description}>
                {horse.description.length > 250 ? `${horse.description.slice(0, 250)}...` : horse.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
