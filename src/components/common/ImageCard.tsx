import { useNavigate } from 'react-router-dom'
import styles from './ImageCard.module.css'

type ImageCardProps = {
  url: string
  name: string
  id: string
  type: 'horse' | 'instructor'
}

export default function ImageCard({
  url,
  name,
  id,
  type,
}: ImageCardProps) {
  const navigate = useNavigate()
  const href = type === 'horse' ? `/horses/${id}` : '/'

  return (
    <div onClick={() => navigate(href)}>
      <li>
        <img src={url} alt={name} className={styles.image} />
      </li>
      <p className={styles.name}>{name}</p>
    </div>
  )
}
