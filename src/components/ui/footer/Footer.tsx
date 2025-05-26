import { useNavigate } from 'react-router-dom'
import styles from './Footer.module.css'

export default function Footer() {
  const navigate = useNavigate()

  return (
    <footer className={styles.footer}>
      <div className={styles.contactUsContainer}>
        <h2>
          Свържете се с нас
        </h2>
        <div className={styles.buttonContainer}>
          <button onClick={() => navigate('/about')}>Контакти</button>
          <button onClick={() => navigate('/reservation')}>Запазете час</button>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} Конна база „Див чифлик“ — Всички права запазени</p>
      </div>
    </footer>
  )
}
