import { useNavigate } from 'react-router-dom'
import styles from './PricesPage.module.css'

export default function PricesPage() {
  const navigate = useNavigate()

  return (
    <section className={styles.page}>
      <h1 className={styles.heading}>Цени и услуги</h1>

      <div className={styles.section}>
        <h2 className={styles.subheading}>Езда</h2>
        <ul className={styles.list}>
          <li>Разходка за начинаещи – 10 мин: <strong>15 лв</strong></li>
          <li>Разходка за начинаещи – 30 мин: <strong>40 лв</strong></li>
          <li>Урок в манеж – 30 мин: <strong>40 лв</strong></li>
          <li>Урок в манеж – 60 мин: <strong>70 лв</strong></li>
          <li>Природен преход – 2 часа: <strong>130 лв</strong></li>
          <li>Природен преход – 4 часа: <strong>230 лв</strong></li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2 className={styles.subheading}>Детски лагери</h2>
        <ul className={styles.list}>
          <li>70 лв/ден <span className={styles.note}>(с включена храна)</span></li>
          <li>350 лв/5 дни <span className={styles.note}>(с включена храна)</span></li>
          <li>60 лв/ден <span className={styles.note}>(без включена храна)</span></li>
          <li>300 лв/5 дни <span className={styles.note}>(без включена храна)</span></li>
        </ul>
      </div>

      <div className={styles.buttons}>
        <button onClick={() => navigate('/reservation')} className={styles.button}>
          Запази час за езда
        </button>
        <button onClick={() => navigate('/campform')} className={styles.button}>
          Запиши за лагер
        </button>
      </div>
    </section>
  )
}
