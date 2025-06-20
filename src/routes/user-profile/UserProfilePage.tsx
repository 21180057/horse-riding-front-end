import { useEffect, useState } from 'react'
import styles from './UserProfilePage.module.css'
import { END_POINTS } from '../../constants'
import type { CampReservationType, UserReservationType } from '../../types'
import { useNavigate } from 'react-router-dom'
import CampReservationTable from '../../components/tables/camp-reservations/CampReservationTable'
import RidesReservationTable from '../../components/tables/rides-reservation/RidesReservationTable'
import CustomButton from '../../components/button/CustomButton'

export default function UserProfilePage() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
  const [ridingReservations, setRidingReservations] = useState<UserReservationType[]>([])
  const [campReservations, setCampReservations] = useState<CampReservationType[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  function handleExport() {
    fetch("http://localhost:5293/export", {
      method: "GET"
    })
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "reservations_export.xlsx");
        document.body.appendChild(link);
        link.click();
        link?.parentNode?.removeChild(link);
      });
  };

  async function handleDeleteReservation(id: number, type: 'camp' | 'ride') {
    try {
      const uri = type === 'camp'
        ? `${END_POINTS.campReservation}/${id}`
        : `${END_POINTS.ridingReservation}/${id}`;
      const response = await fetch(uri, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) {
        const msg = await response.text()
        alert(msg)
        return
      }
      if (type === 'camp') {
        setCampReservations(campReservations.filter((reservation) => reservation.id !== id))
      } else {
        setRidingReservations(ridingReservations.filter((reservation) => reservation.id !== id))
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    const userId = currentUser?.id
    const userRole = currentUser?.role

    if (!userId) return;
    const getRidingReservations = async () => {
      try {
        setIsLoading(true)
        const endpoint = userRole === 'admin' || userRole === 'instructor'
          ? END_POINTS.ridingReservation
          : END_POINTS.userReservations + userId
        const response = await fetch(endpoint)
        const ridesData = await response.json()
        setRidingReservations(ridesData)
      } catch (e) {
        console.log(e)
      } finally {
        setIsLoading(false)
      }
    }

    const getCampReservations = async () => {
      try {
        setIsLoading(true)
        const endpoint = userRole === 'admin'
          ? END_POINTS.campReservation
          : END_POINTS.getAllCampReservations + userId
        const response = await fetch(endpoint)
        const campData = await response.json()
        setCampReservations(campData)
      } catch (e) {
        console.log(e)
      } finally {
        setIsLoading(false)
      }
    }

    getRidingReservations()
    getCampReservations()
  }, [currentUser?.id])

  if (!currentUser) {
    return <div className={styles.page}>Потребителят не е влязъл в системата.</div>
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Профил</h1>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2>{currentUser.fullName}</h2>
          <button
            onClick={() => {
              localStorage.removeItem('currentUser')
              navigate('/')
            }}
            className={`${styles.actionButton} ${styles.logout}`}
          >
            Изход
          </button>
          {currentUser?.role === 'admin' && (
            <button
              onClick={() => {
                navigate('/register')
              }}
              className={`${styles.actionButton} ${styles.addUser}`}
            >Добави потребител
            </button>
          )}
        </div>
        <p><strong>Имейл:</strong> {currentUser.email}</p>
        <p><strong>Телефон:</strong> {currentUser.phoneNumber}</p>
      </div>

      {isLoading && <p className={styles.loading}>Зареждане...</p>}

      {currentUser?.role === 'admin' && (
        <CustomButton
          color='#ffd8a8'
          text={isLoading ? 'Моля изчакайте...' : 'Експорт на резервации'}
          fontColor='#111'
          onClick={handleExport}
          sx={{
            width: '20rem',
            fontWeight: 'bold',
          }}
        />
      )}

      <RidesReservationTable
        ridingReservations={ridingReservations}
        handleDeleteReservation={handleDeleteReservation}
      />

      <CampReservationTable
        campReservations={campReservations}
        handleDeleteReservation={handleDeleteReservation}
      />
    </div >
  )
}

