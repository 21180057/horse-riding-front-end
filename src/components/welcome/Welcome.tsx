import wallpaper from '../../../public/images/w4.jpg'
import styles from './Welcome.module.css'

export default function Welcome() {
  return (
    <section className={styles.sectionStyles}>
      <img
        src={wallpaper}
        className={styles.img}
      />
      <div className={styles.buttonContainerStyles}>
        <button className={styles.buttonStyles}>Конете</button>
        <button className={styles.buttonStyles}>Езда</button>
      </div>
    </section>
  )
}
