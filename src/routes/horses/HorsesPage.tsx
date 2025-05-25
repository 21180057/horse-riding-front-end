import { useState } from 'react'
import styles from './HorsesPage.module.css'

type Horse = {
  name: string
  description: string
  imagePaths: string[]
}

const HORSES: Horse[] = [
  {
    name: 'Блу',
    description: 'Нежна и търпелива, подходяща за начинаещи ездачи.',
    imagePaths: ['/images/horses/blu/b1.jpg', '/images/horses/blu/b2.jpg', '/images/horses/blu/b3.jpg', '/images/horses/blu/b4.jpg', '/images/horses/blu/b5.jpg', '/images/horses/blu/b6.jpg', '/images/horses/blu/b7.jpg'],
  },
  {
    name: 'Джо Прешес',
    description: 'Енергичен и обича предизвикателствата. Идеален за напреднали.',
    imagePaths: ['/images/horses/jp/jp1.jpg'],
  },
  {
    name: 'Джухара',
    description: 'Спокойна и интелигентна, предпочитана за дълги разходки.',
    imagePaths: ['/images/horses/juhara/j1.jpg', '/images/horses/juhara/j2.jpg', '/images/horses/juhara/j3.jpg'],
  },
  {
    name: 'Зехир',
    description: 'Силен и енергичен жребец с впечатляваща осанка. Подходящ за опитни ездачи, които търсят предизвикателства и динамика.',
    imagePaths: ['/images/horses/zehir/z1.jpg', '/images/horses/zehir/z2.jpg', '/images/horses/zehir/z3.jpg', '/images/horses/zehir/z4.jpg'],
  },
  {
    name: 'Ласка',
    description: 'Изключително спокойна и добродушна кобила, която е идеален избор за деца и начинаещи. Името ѝ напълно отразява нейния характер.',
    imagePaths: ['/images/horses/laska/l1.jpg', '/images/horses/laska/l2.jpg', '/images/horses/laska/l3.jpg', '/images/horses/laska/l4.jpg'],
  },
  {
    name: 'Пепина',
    description: 'Жизнерадостна и любопитна, Пепина обича вниманието и лесно създава връзка с ездачите си. Подходяща за тренировки и забавни разходки.',
    imagePaths: ['/images/horses/pepina/p1.jpg', '/images/horses/pepina/p2.jpg', '/images/horses/pepina/p3.jpg', '/images/horses/pepina/p4.jpg'],
  },
]

export default function HorsesPage() {
  const [loaded, setLoaded] = useState<Record<string, boolean>>({})

  const handleImageLoad = (src: string) => {
    setLoaded((prev) => ({ ...prev, [src]: true }))
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Нашите коне</h1>
      {HORSES.map((horse) => (
        <section key={horse.name} className={styles.card}>
          <h2 className={styles.name}>{horse.name}</h2>
          <p className={styles.description}>{horse.description}</p>
          <div className={styles.gallery}>
            {horse.imagePaths.map((src, idx) => (
              <div key={idx} className={styles.imageWrapper}>
                {!loaded[src] && <div className={styles.spinner}></div>}
                <img
                  src={src}
                  alt={`${horse.name} ${idx + 1}`}
                  className={`${styles.image} ${loaded[src] ? styles.visible : styles.hidden}`}
                  onLoad={() => handleImageLoad(src)}
                />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
