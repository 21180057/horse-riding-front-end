import { useHorses } from '../../hooks/useHorses'
import styles from './HorsesPage.module.css'
import { useNavigate } from 'react-router-dom'

export default function HorsesPage() {
  const navigate = useNavigate()
  const { horses, isLoading } = useHorses()

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Нашите коне</h1>
      <p style={{ color: '#111' }}>
        Тези коне предлагат уникални преживявания за всеки ездач, като всеки от тях
        има своето неповторимо очарование и характер! Ако искате да видите и
        другите наши коне заповядайте, очакваме ви!
      </p>

      <div className={styles.grid}>
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className={`${styles.card} ${styles.horseCard}`}>
              <div className={styles.imageWrapper}>
                <div className={styles.spinner} />
              </div>
              <div className={styles.info}>
                <div className={styles.skeletonText} />
                <div className={styles.skeletonText} />
              </div>
            </div>
          ))
          : horses.map((horse) => (
            <div
              onClick={() => navigate(`/horses/${horse.id}`)}
              key={horse.id}
              className={`${styles.card} ${styles.horseCard}`}
            >
              <div className={styles.imageWrapper}>
                <img
                  src={horse.imagePaths[0]}
                  alt={horse.name}
                  className={styles.photo}
                />
              </div>
              <div className={styles.info}>
                <h2 className={styles.name}>{horse.name}</h2>
                <p className={styles.description}>
                  {horse.description.length > 250
                    ? `${horse.description.slice(0, 250)}...`
                    : horse.description}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
