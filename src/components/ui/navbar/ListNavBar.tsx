import styles from './ListNavBar.module.css'
import { Link } from 'react-router-dom'

export default function ListNavBar() {
  return (
    <ul className={styles.navigation__list}>
      <li className={styles.navigation__list__item}>
        <Link className={styles.navigation__list__item} to="/horses">
          Нашите коне
        </Link>
      </li>
      <li className={styles.navigation__list__item}>
        <Link className={styles.navigation__list__item} to="/instructors">
          Инструктори
        </Link>
      </li>
      <li className={styles.navigation__list__item}>
        <Link className={styles.navigation__list__item} to="/gallery">
          Галерия
        </Link>
      </li>
      <li className={styles.navigation__list__item}>
        <Link className={styles.navigation__list__item} to="/services">
          Услуги
        </Link>
      </li>
      <li className={styles.navigation__list__item}>
        <Link className={styles.navigation__list__item} to="/about-us">
          За нас
        </Link>
      </li>
    </ul>
  )
}
