import styles from './ListNavBar.module.css'
import { Link, useNavigate } from 'react-router-dom'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

export default function ListNavBar() {
  const navigate = useNavigate()
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
  return (
    <ul className={styles.navigation__list}>
      <li className={styles.navigation__list__item}>
        <Link className={styles.navigation__list__item} to="/horses">
          Нашите коне
        </Link>
      </li>
      <li className={styles.navigation__list__item}>
        <Link className={styles.navigation__list__item} to="/riding">
          Езда
        </Link>
      </li>
      <li className={styles.navigation__list__item}>
        <Link className={styles.navigation__list__item} to="/camps">
          Детски лагери
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
      {/* <li className={styles.navigation__list__item}>
        <Link className={styles.navigation__list__item} to="/services">
          Услуги
        </Link>
      </li> */}
      <li className={styles.navigation__list__item}>
        <Link className={styles.navigation__list__item} to="/about-us">
          За нас
        </Link>
      </li>
      {!currentUser.id ? (
        <li className={styles.navigation__list__item}>
          <Link className={styles.navigation__list__item} to="/login">
            Вход
          </Link>
        </li>
      ) : (
        <AccountCircleOutlinedIcon
          fontSize='large'
          className={styles.userIcon}
          onClick={() => navigate('/user-profile')}
        />
      )}
    </ul>
  )
}
