import ContactsNavBar from './ContactsNavBar'
import ListNavBar from './ListNavBar'
import styles from './NavBar.module.css'

export default function NavBar() {
  return (
    <nav className={styles.container}>
      <div className={styles.icon}>
        KE
      </div>
      <div className={styles.nav_bars__container}>
        <ContactsNavBar />
        <ListNavBar />
      </div>
    </nav>
  )
}
