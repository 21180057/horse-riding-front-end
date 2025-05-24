import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.section}>
          <h4>Контакти</h4>
          <p>Телефон: +359 888 999 000</p>
          <p>Email: victoria_instructor@gmail.com</p>
          <p>Адрес: ул. Георги Георгиев, кв. Левски, София</p>
        </div>

        <div className={styles.section}>
          <h4>Работно време</h4>
          <p>Пон - Нед: 08:00 – 20:00</p>
        </div>

        <div className={styles.section}>
          <h4>Последвайте ни</h4>
          <div className={styles.socials}>
            <a href="#" aria-label="Facebook">Facebook</a>
            <a href="#" aria-label="Instagram">Instagram</a>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} Конна база "Виктория" — Всички права запазени</p>
      </div>
    </footer>
  )
}
