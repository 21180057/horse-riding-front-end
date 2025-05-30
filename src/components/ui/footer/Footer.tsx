import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} Конна база „Див чифлик“ — Всички права запазени</p>
      </div>
    </footer>
  )
}
