import { Link } from 'react-router-dom'
import wallpaper from '../../../public/images/w4.jpg'
import styles from './Welcome.module.css'

export default function Welcome() {
  return (
    <section className={styles.sectionStyles}>
      <img
        src={wallpaper}
        className={styles.img}
      />
      <div className={styles.content}>
        <h1 className={styles.welcomeText}>
          Добре дошли в конна база „Див чифлик“
        </h1>
        <div className={styles.buttonContainerStyles}>
          <Link to='/horses'>
            <button className={styles.buttonStyles}>Конете</button>
          </Link>
          <Link to='/instructors'>
            <button className={styles.buttonStyles}>Инструктори</button>
          </Link>
        </div>
      </div>
    </section>
  )
}
