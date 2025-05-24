import styles from './InstructorItem.module.css'

export default function InstructorItem({ name, url }: { name: string, url: string }) {
  return (
    <div>
      <li>
        <img src={url} alt={name} className={styles.image} />
      </li>
      <p className={styles.name}>{name}</p>
    </div>
  )
}
