import styles from './ListNavBar.module.css'

export default function ListNavBar() {
  return (
    <ul className={styles.navigation__list}>
      <li className={styles.navigation__list__item}>Нашите коне</li>
      <li className={styles.navigation__list__item}>Езда</li>
      <li className={styles.navigation__list__item}>Цени</li>
      <li className={styles.navigation__list__item}>Услуги</li>
      <li className={styles.navigation__list__item}>Галерия</li>
      <li className={styles.navigation__list__item}>Контакти</li>
    </ul>
  )
}
