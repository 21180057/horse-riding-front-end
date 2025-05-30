import { useEffect, useState } from 'react'
import styles from './CampForm.module.css'
import DatePicker, { DateObject } from 'react-multi-date-picker'
import { END_POINTS } from '../../../constants'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Button from 'react-multi-date-picker/components/button'
import { isPositiveInteger } from '../../../utils/helpers'

export default function CampRegistrationForm() {
  const [formData, setFormData] = useState({
    childName: '',
    age: '',
    parentName: '',
    phone: '',
    email: '',
    days: [] as string[],
    comment: '',
  })
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { pathname } = useLocation()

  const [selectedDates, setSelectedDates] = useState<DateObject[] | []>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const currentUser = localStorage.getItem('currentUser')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setError('')
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const isIdNumber = isPositiveInteger(id)
  const isUpdating = pathname.includes('update')

  useEffect(() => {
    if (!isIdNumber || !isUpdating) return
    const getCampReservationById = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`${END_POINTS.campReservation}/${id}`)
        if (!response.ok) {
          const errorMsg = await response.text()
          setError(errorMsg)
          return
        }
        const campData = await response.json()
        const campDataDates = [campData.dates[0], campData.dates[campData.dates.length - 1]].map(date => date.split('T')[0])
        setFormData({
          childName: campData.childName,
          age: campData.childAge,
          comment: campData.comment,
          days: campDataDates,
          email: campData.parentEmail,
          parentName: campData.parentName,
          phone: campData.parentPhone,
        })
      } catch (e) {
        console.log(e)
        setError('Възникна грешка. Моля, опитайте отново.')
        return
      } finally {
        setIsLoading(false)
      }
    }

    getCampReservationById()
  }, [isIdNumber, isUpdating])
  console.log({ dates: formData.days.map(dateStr => new DateObject(dateStr)) })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.childName.trim()) {
      setError('Моля, въведете име на детето.')
      return
    }

    const { age, childName, parentName, phone, email, days } = formData

    const childAge = Number(age)
    if (!childAge || isNaN(childAge) || childAge < 3 || childAge > 18) {
      setError('Моля, въведете възраст между 3 и 18 години.')
      return
    }

    if (!parentName.trim()) {
      setError('Моля, въведете име на родител.')
      return
    }

    if (!childName.trim()) {
      setError('Моля, въведете име на родител.')
      return
    }

    if (!phone.trim()) {
      setError('Моля, въведете телефон за връзка.')
      return
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Моля, въведете валиден имейл адрес.')
      return
    }

    if (days.length < 2) {
      setError('Моля, изберете период от поне два последователни дни.')
      return
    }

    console.log('Submitted camp registration:', formData)
    console.log('Selected dates:', selectedDates)

    try {
      let userInfo = null
      if (currentUser) {
        userInfo = JSON.parse(currentUser)
      }
      const endpoint = (isUpdating && id) ? `${END_POINTS.campReservation}/${id}` : END_POINTS.campReservation
      const response = await fetch(endpoint, {
        method: (isUpdating && id) ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ChildAge: age,
          ParentName: parentName,
          ChildName: childName,
          ParentPhone: phone,
          ParentEmail: email,
          Dates: formData.days.map(d => new Date(d)),
          FoodIncluded: false,
          Comment: formData.comment,
          UserId: userInfo?.id,
        }),
      })
      if (!response.ok) {
        const errorMsg = await response.text()
        setError(errorMsg)
        return
      }
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }

    alert('Успешно записване за летния лагер!')
    navigate('/user-profile')
  }

  return (
    <div className={styles.background}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.heading}>{isUpdating && isIdNumber ? 'Промяна на резервация' : 'Записване за летен лагер'}</h2>

        <div className={styles.row}>
          <div className={styles.column}>
            <label htmlFor='childName'>Име на дете*</label>
            <input
              type='text'
              name='childName'
              id='childName'
              value={formData.childName}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.column}>
            <label htmlFor='age'>Възраст*</label>
            <input
              type='number'
              name='age'
              id='age'
              min={3}
              max={18}
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.column}>
            <label htmlFor='parentName'>Име на родител*</label>
            <input
              type='text'
              name='parentName'
              id='parentName'
              value={formData.parentName}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.column}>
            <label htmlFor='phone'>Телефон за връзка*</label>
            <input
              type='tel'
              name='phone'
              id='phone'
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.column}>
            <label htmlFor='email'>Имейл*</label>
            <input
              type='email'
              name='email'
              id='email'
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <label>Избери дати*</label>
        <DatePicker
          range
          format='DD MMM'
          value={selectedDates}
          weekStartDayIndex={1}
          onChange={(range: DateObject[] | null) => {
            const normalized = range ?? []
            setSelectedDates(normalized)
            const formatted = normalized.map(d => d.format('DD MMM'))
            setFormData(prev => ({ ...prev, days: formatted }))
          }}
          className={styles.datePicker}
          placeholder='Изберете период от календара'
          mapDays={({ date }) => {
            const day = date.weekDay.index
            if (day === 0 || day === 6) {
              return {
                disabled: true,
                style: { color: '#ccc', textDecoration: 'line-through' },
              }
            }
            return {}
          }}
          render={(_value, openCalendar) => (
            <Button
              onClick={openCalendar}
              className={styles.datePickerButton}
            >
              <span>
                От: {formData.days[0]}
              </span>
              <span>
                До: {formData.days[formData.days.length - 1]}
              </span>
            </Button>
          )}
        />

        <label htmlFor='comment'>Коментар (по избор*)</label>
        <textarea
          name='comment'
          id='comment'
          value={formData.comment}
          onChange={handleChange}
          rows={3}
        />
        {error && <p style={{ color: 'red', fontWeight: '700', fontSize: '1.2rem', margin: 0, padding: 0 }}>{error}</p>}
        <button disabled={isLoading} type='submit' className={styles.submit}>{isLoading ? 'Моля изчакайте...' : 'Запис'}</button>
      </form>
    </div>
  )
}
