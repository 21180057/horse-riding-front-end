import { useState } from 'react'
import { IMAGES } from './images'
import styles from './GalleryPage.module.css'

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [loaded, setLoaded] = useState(Array(IMAGES.length).fill(false))

  const handleImageLoad = (index: number) => {
    setLoaded((prev) => {
      const updated = [...prev]
      updated[index] = true
      return updated
    })
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Галерия</h1>
      <div className={styles.grid}>
        {IMAGES.map((src, index) => (
          <div key={index} className={styles.imageWrapper}>
            {!loaded[index] && <div className={styles.spinner}></div>}
            <img
              src={src}
              alt={`Галерия ${index + 1}`}
              className={`${styles.image} ${loaded[index] ? styles.visible : styles.hidden}`}
              onClick={() => setSelectedImage(src)}
              onLoad={() => handleImageLoad(index)}
            />
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className={styles.modal} onClick={() => setSelectedImage(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.closeButton}
              onClick={() => setSelectedImage(null)}
              aria-label='Затвори'
            >
              &#10006;
            </button>
            <img src={selectedImage} alt='Преглед' className={styles.modalImage} />
          </div>
        </div>
      )}
    </div>
  )
}
