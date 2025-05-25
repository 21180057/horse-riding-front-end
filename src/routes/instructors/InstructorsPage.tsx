import { useState } from 'react'
import styles from './InstructorsPage.module.css'

const INSTRUCTORS = [
  {
    name: 'Виктория',
    description: 'Лицензиран инструктор с над 10 години опит в обучението на деца и възрастни.',
    photo: '/images/instructors/vicky/vicky.png',
  },
  {
    name: 'Борис',
    description: 'Специалист в подготовката на ездачи за състезания и работа с по-енергични коне.',
    photo: '/images/instructors/boris/boris.jpg',
  },
  {
    name: 'Ева',
    description: 'С внимание и търпение обучава най-малките ни ездачи. Превръща всяко занятие в приятно приключение.',
    photo: '/images/instructors/eva/eva.jpg',
  },
  {
    name: 'Ивайло',
    description: 'Опитен инструктор по прескачане на препятствия и обучение за напреднали.',
    photo: '/images/instructors/ivaylo/ivaylo.jpg',
  },
  {
    name: 'Павлета',
    description: 'Страстна любителка на конете и специалист по терапевтична езда за деца.',
    photo: '/images/instructors/pavleta/pavleta.jpg',
  },
]

export default function OurInstructorsPage() {
  const [loaded, setLoaded] = useState<boolean[]>(Array(INSTRUCTORS.length).fill(false))

  const handleImageLoad = (index: number) => {
    setLoaded((prev) => {
      const updated = [...prev]
      updated[index] = true
      return updated
    })
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Нашите инструктори</h1>
      <div className={styles.grid}>
        {INSTRUCTORS.map((instructor, index) => (
          <div key={instructor.name} className={styles.card}>
            <div className={styles.imageWrapper}>
              {!loaded[index] && <div className={styles.spinner}></div>}
              <img
                src={instructor.photo}
                alt={instructor.name}
                className={`${styles.photo} ${loaded[index] ? styles.visible : styles.hidden}`}
                onLoad={() => handleImageLoad(index)}
              />
            </div>
            <div className={styles.info}>
              <h2 className={styles.name}>{instructor.name}</h2>
              <p className={styles.description}>{instructor.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
