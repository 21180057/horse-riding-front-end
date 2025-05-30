import type { UserReservationType } from '../../../types'
import ActionsColumn from '../action-column/ActionColumn'
import styles from '../styles/ReservationTable.module.css'

type RidingReservationTableProps = {
  ridingReservations: UserReservationType[]
  handleDeleteReservation: (id: number, type: 'camp' | 'ride') => void
}

export default function RidesReservationTable({
  ridingReservations,
  handleDeleteReservation,
}: RidingReservationTableProps) {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
  const isInstructor = currentUser.role === 'instructor' && currentUser.instructorId

  const reservationsForInstructor = ridingReservations.filter((r) => r.instructorId === currentUser.instructorId)

  function renderHeader() {
    if (isInstructor && reservationsForInstructor.length === 0) {
      return <p>Нямате направени резервации за езда за инструктор {currentUser?.name}.</p>
    } else if (!isInstructor && ridingReservations.length === 0) {
      return <p>Все още нямате направени резервации за езда.</p>
    } else if (isInstructor && reservationsForInstructor.length > 0) {
      return <p>Направени резервации за езда за инструктор {currentUser?.name}</p>
    }
    return <p style={{ marginBottom: '0', fontSize: '1.33em', fontWeight: '700' }}>Направени резервации за езда</p>
  }

  function renderContent() {
    if (isInstructor && reservationsForInstructor.length > 0) {
      return (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Услуга</th>
              <th>Дата</th>
              <th>Час</th>
              <th>Име</th>
              <th>Телефон</th>
              <th>Имейл</th>
              <th>Инструктор</th>
              <th>Коментар</th>
              {!isInstructor && <th>Действия</th>}
            </tr>
          </thead>
          <tbody>
            {reservationsForInstructor.map((r, index) => (
              <tr key={index}>
                <td>{r.service}</td>
                <td>{new Date(r.date).toISOString().split('T')[0]}</td>
                <td>{r.time.split(':').slice(0, 2).join(':')}</td>
                <td>{r.name}</td>
                <td>{r.phone}</td>
                <td>{r.email}</td>
                <td>{r.instructor?.name ? r.instructor?.name : r.instructorName ? r.instructorName : '-'}</td>
                <td>{r.comment || '—'}</td>
                {!isInstructor && (
                  <ActionsColumn
                    type='ride'
                    id={r.id}
                    onDelete={handleDeleteReservation}
                  />
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )
    } else if (!isInstructor && ridingReservations.length > 0) {
      return (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Услуга</th>
              <th>Дата</th>
              <th>Час</th>
              <th>Име</th>
              <th>Телефон</th>
              <th>Имейл</th>
              <th>Инструктор</th>
              <th>Коментар</th>
              {!isInstructor && <th>Действия</th>}
            </tr>
          </thead>
          <tbody>
            {ridingReservations.map((r, index) => (
              <tr key={index}>
                <td>{r.service ? r.service : r.serviceType}</td>
                <td>{new Date(r.date).toISOString().split('T')[0]}</td>
                <td>{r.time.split(':').slice(0, 2).join(':')}</td>
                <td>{r.name}</td>
                <td>{r.phone}</td>
                <td>{r.email}</td>
                <td>{r.instructor?.name ? r.instructor?.name : r.instructorName ? r.instructorName : '-'}</td>
                <td>{r.comment || '—'}</td>
                <ActionsColumn
                  type='ride'
                  id={r.id}
                  onDelete={handleDeleteReservation}
                />
              </tr>
            ))}
          </tbody>
        </table>
      )
      return null;
    }
  }

  return (
    <>
      {renderHeader()}
      {renderContent()}
    </>
  )
}