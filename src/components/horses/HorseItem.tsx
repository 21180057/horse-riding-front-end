import styles from './HorseItem.module.css'

type HorseItemProps = {
  name: string
  url: string
}

export default function HorseItem({
  name,
  url,
}: HorseItemProps) {
  return (
    <div>
      <li>
        <img src={url} alt={name} className={styles.image} />
      </li>
      <p className={styles.name}>{name}</p>
    </div>
  )
}
