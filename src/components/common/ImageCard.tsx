import styles from './ImageCard.module.css'

export default function ImageCard({
  url,
  name,
}: { url: string, name: string }) {
  return (
    <div>
      <li>
        <img src={url} alt={name} className={styles.image} />
      </li>
      <p className={styles.name}>{name}</p>
    </div>
  )
}
