import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { END_POINTS } from '../../constants'
import { useEffect, useState } from 'react'
import type { HorseType, InstructorType } from '../../types'
import styles from './Search.module.css'

type SearchDataType = {
  horses: HorseType[]
  instructors: InstructorType[]
}

export default function Search() {
  const { search } = useLocation()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const [data, setData] = useState<SearchDataType | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const term = search.split('=')[1]

  useEffect(() => {
    const handleSearch = async () => {
      try {
        const response = await fetch(END_POINTS.searchTerm + term)
        const searchData = await response.json()

        if (response.ok) {
          localStorage.setItem('searchResults', JSON.stringify({ ...searchData, term }))
          setData(searchData)
        }

        console.log(searchData)
      } catch (e) {
        console.log(e)
      } finally {
        setIsLoading(false)
      }
    }

    handleSearch()
  }, [term])

  if (!data || isLoading) {
    return <p>Моля изчакайте...</p>
  }

  const param = searchParams.get('query')

  if (data.horses.length === 0 && data.horses.length === 0) {
    return <p>Няма намерени резултати<span style={{ fontWeight: 'bolder' }}>"{param}"</span></p>
  }

  return (
    <section className={styles.searchPage}>
      <h2>Намерени резултати за <span style={{ fontWeight: 'bolder' }}>"{param}":</span></h2>
      {data.horses.length > 0 && data.horses.map(horse => (
        <div
          onClick={() => navigate(`/horses/${horse.id}`)}
          key={horse.id}
          className={`${styles.card} ${styles.horseCard}`}
        >
          <div className={styles.imageWrapper}>
            <img
              src={horse.imagePaths[0]}
              alt={horse.name}
              className={styles.photo}
            />
          </div>
          <div className={styles.info}>
            <h2 className={styles.name}>{horse.name}</h2>
            <p className={styles.description}>
              {horse.description.length > 250
                ? `${horse.description.slice(0, 250)}...`
                : horse.description}
            </p>
          </div>
        </div>
      ))}

      {data.instructors.map((instructor) => (
        <div key={instructor.id} className={styles.card}>
          <div className={styles.imageWrapper}>
            <img
              src={instructor.photoPath}
              alt={instructor.name}
              className={styles.photo}
            />
          </div>
          <div className={styles.info}>
            <h2 className={styles.name}>{instructor.name}</h2>
            <p className={styles.description}>{instructor.description}</p>
          </div>
        </div>
      ))}
    </section>
  )
}
