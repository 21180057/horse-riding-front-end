import type { CampReservationType } from '../../../types'
import ActionsColumn from '../action-column/ActionColumn'
import styles from '../styles/ReservationTable.module.css'

type CampReservationTableProps = {
  campReservations: CampReservationType[]
  handleDeleteReservation: (id: number, type: 'camp' | 'ride') => void
}

export default function CampReservationTable({
  campReservations,
  handleDeleteReservation,
}: CampReservationTableProps) {
  return (
    <>
      <h2 className={styles.subheading}>Резервации за детски лагери</h2>
      {campReservations.length === 0 ? (
        <p>Нямате направени резервации.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Име на дете</th>
              <th>Възраст</th>
              <th>Дати</th>
              <th>Телефон</th>
              <th>Родител</th>
              <th>Имейл</th>
              <th>Коментар</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {campReservations.map((r, index) => (
              <tr key={index}>
                <td>{r.childName}</td>
                <td>{r.childAge}</td>
                <td>{[r.dates[0], r.dates[r.dates.length - 1]].map((d: string) => new Date(d).toISOString().split('T')[0]).join(' - ')}</td>
                <td>{r.parentPhone}</td>
                <td>{r.parentName}</td>
                <td>{r.parentEmail || '—'}</td>
                <td>{r.comment || '—'}</td>
                <ActionsColumn type='camp' id={r.id} onDelete={handleDeleteReservation} />
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}
