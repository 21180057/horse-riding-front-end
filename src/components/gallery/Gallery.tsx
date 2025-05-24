import GalleryCaroussel from './GalleryCaroussel'
import styles from './Gallery.module.css'

export default function Gallery() {
  return (
    <div className={styles.gallery__container}>
      <h2 style={{ margin: '0' }}>Галерия</h2>
      <h4>Нашата конна база</h4>
      <GalleryCaroussel />
    </div>
  )
}
