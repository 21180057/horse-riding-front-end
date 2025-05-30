import { useState } from 'react'
import ContactsNavBar from './ContactsNavBar'
import ListNavBar from './ListNavBar'
import styles from './NavBar.module.css'
import logo from '/images/logo/logo-optimized.webp'

import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom'

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className={styles.container}>
      <div className={styles.logo}>
        <Link to='/'>
          <img src={logo} alt="Лого" className={styles.logoImage} />
        </Link>
      </div>
      <button
        onClick={() => setMenuOpen(prev => !prev)}
        className={styles.menuToggle}
      >
        <MenuIcon fontSize='medium' />
      </button>
      <div className={`${styles.nav_bars__container} ${menuOpen ? styles.open : ''}`}>
        <ContactsNavBar />
        <ListNavBar />
      </div>
    </nav>
  )
}
