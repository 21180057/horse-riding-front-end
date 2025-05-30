import React, { useEffect, useState } from 'react'
import styles from './ReservationForm.module.css'
import useInstructors from '../../../hooks/useInstructors'
import { END_POINTS } from '../../../constants'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { isPositiveInteger } from '../../../utils/helpers'
import { type InstructorType } from '../../../types'
import CustomModal from '../../modal/CustomModal'
import { Typography } from '@mui/material'
import CustomButton from '../../button/CustomButton'

const SERVICES = [
  'Разходка за начинаещи - 10 мин',
  'Разходка за начинаещи – 30 мин',
  'Урок в манеж - 30 мин',
  'Урок в манеж - 60 мин',
  'Природен преход - 2 часа',
  'Природен преход - 4 часа'
]

const INITIAL_FORMDATA = {
  service: 'asd',
  date: '',
  time: '',
  instructor: '',
  name: '',
  phone: '',
  email: '',
  comment: '',
}

export default function ReservationForm() {
  const [formData, setFormData] = useState(INITIAL_FORMDATA)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [serviceOptions, setServiceOptions] = useState(SERVICES)
  const [filteredInstructors, setFilteredInstructors] = useState<InstructorType[]>([])

  const { instructors, isLoading: loading } = useInstructors()
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { pathname } = useLocation()

  const isIdNumber = isPositiveInteger(id)
  const isUpdating = pathname.includes('update')

  useEffect(() => {
    if (!isIdNumber || !isUpdating || instructors.length === 0) return
    const getRegistrationById = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`${END_POINTS.ridingReservation}/${id}`)
        if (!response.ok) {
          const errorMsg = await response.text()
          setError(errorMsg)
          return
        }
        const data = await response.json()
        const instructorName = instructors.find(i => i.id === data.instructorId)?.name ?? ''

        setFormData({
          service: data.serviceType,
          date: new Date(data.date).toISOString().split('T')[0],
          time: data.time,
          name: data.name,
          phone: data.phone,
          email: data.email,
          comment: data.comment,
          instructor: instructorName,
        })
      } catch (e) {
        console.log(e)
      } finally {
        setIsLoading(false)
      }
    }

    getRegistrationById()
  }, [isIdNumber, id, isUpdating, instructors])

  function getAvailableOptionsForSelectedInstructor(instructorName: string) {
    if (!instructorName) return SERVICES
    if (instructorName === 'Ивайло' || instructorName === 'Ева') return SERVICES
    if (instructorName === 'Борис') {
      const res = SERVICES.filter(e => e.includes('Разходка за начинаещи'))
      console.log({ res });
      return res
    }
    if (instructorName === 'Виктория') return SERVICES.filter(
      e => e.includes('Разходка за начинаещи') || e.includes('Урок в манеж') || e.includes('Природен преход')
    )
    if (instructorName === 'Павлета') return SERVICES.filter(e => e.includes('Разходка за начинаещи') || e.includes('Урок в манеж'))
    return []
  }

  function filterInstructorsForSelectedService(service: string) {
    if (!service) return instructors
    if (service.includes('Разходка за начинаещи')) return instructors
    if (service.includes('Урок в манеж')) return instructors.filter(e => e.name !== 'Борис')
    if (service.includes('Природен преход')) return instructors.filter(e =>
      ['Виктория', 'Ивайло', 'Ева'].includes(e.name)
    )
    return instructors
  }

  const availableServices = getAvailableOptionsForSelectedInstructor(formData.instructor)
  console.log({ availableServices });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setError('')
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errors: string[] = []

    const { service, comment, date, email, instructor, name, phone, time } = formData

    if (!formData.service.trim()) errors.push('Моля, изберете услуга.')
    if (!formData.date) errors.push('Моля, изберете дата.')
    if (!formData.time) errors.push('Моля, изберете час.')
    if (!formData.name.trim()) errors.push('Моля, въведете име.')
    if (!formData.phone.trim()) errors.push('Моля, въведете телефон.')
    if (!formData.email.trim()) errors.push('Моля, въведете имейл.')

    if (errors.length > 0) {
      alert(errors.join('\n'))
      return
    }

    const randomInstructorIndex = Math.floor(Math.random() * instructors.length)
    const instructorId = formData.instructor
      ? instructors.find(i => i.name === instructor)?.id
      : instructors[randomInstructorIndex].id

    try {
      setIsLoading(true)
      const currentLoggedUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
      const endpoint = isUpdating ? `${END_POINTS.ridingReservation}/${id}` : END_POINTS.ridingReservation
      const response = await fetch(endpoint, {
        method: isUpdating ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Service: service,
          Date: date,
          Time: time,
          Name: name,
          Phone: phone,
          Email: email,
          InstructorId: instructorId,
          UserId: currentLoggedUser?.id,
          Comment: comment,
        }),
      })
      if (!response.ok) {
        const errorMsg = await response.text()
        setError(errorMsg)
        return
      }
      setIsModalOpen(true)
    } catch (e) {
      console.log(e)
      setError('Възникна грешка при изпращането на резервацията. Моля, опитайте отново.')
      return
    } finally {
      setIsLoading(false)
    }
  }

  function renderInvalidNumberForUpdatingReservation() {
    return (
      <>
        <p style={{ color: "#333", fontWeight: '800', fontSize: '1.2em' }}>
          Резервация с id "{id}" не бе намерена. Моля въведете валидно id.
        </p>
        <button
          style={{ margin: 'auto', backgroundColor: 'azure', border: '1px solid #333', padding: '.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}
          type='button'
          onClick={() => navigate('/user-profile')}
        >
          Назад
        </button>
      </>
    )
  }

  function renderForm() {
    return (
      <>
        <h2 className={styles.heading}>{isUpdating ? 'Промяна на резервация' : 'Направи резервация'}</h2>

        <label htmlFor='service'>Избери услуга</label>
        <select
          style={{ background: '#fef8ec' }}
          name='service'
          id='service'
          value={formData.service}
          onChange={(e) => {
            handleChange(e)
            const filtered = filterInstructorsForSelectedService(e.target.value)
            setFilteredInstructors(filtered)
            setFormData(prev => ({ ...prev, service: e.target.value }))
          }}
          required
        >
          <option value=''>-- Изберете --</option>
          {serviceOptions.map((service) => (
            <option key={service} value={service}>{service}</option>
          ))}
        </select>

        <label htmlFor='date'>Дата</label>
        <input style={{ background: '#fef8ec' }} type='date' id='date' name='date' value={formData.date} onChange={handleChange} required />

        <label htmlFor='time'>Час</label>
        <input style={{ background: '#fef8ec' }} type='time' id='time' name='time' value={formData.time} onChange={handleChange} required />

        <label htmlFor='instructor'>Инструктор (по избор)</label>
        <select
          style={{ background: '#fef8ec' }}
          name='instructor'
          id='instructor'
          value={formData.instructor}
          onChange={(e) => {
            handleChange(e)
            const options = getAvailableOptionsForSelectedInstructor(e.target.value)
            console.log(options, e.target.value);
            setServiceOptions(options)
          }}
        >
          <option value=''>-- Без предпочитание --</option>
          {filteredInstructors.map((instructor) => (
            <option key={instructor.id} value={instructor.name}>{instructor.name}</option>
          ))}
        </select>

        <label htmlFor='name'>Име и фамилия</label>
        <input style={{ background: '#fef8ec' }} type='text' name='name' id='name' value={formData.name} onChange={handleChange} required />

        <label htmlFor='phone'>Телефон за контакт</label>
        <input style={{ background: '#fef8ec' }} type='tel' id='phone' name='phone' value={formData.phone} onChange={handleChange} required />

        <label htmlFor='email'>Имейл (по избор)</label>
        <input style={{ background: '#fef8ec' }} type='email' id='email' name='email' value={formData.email} onChange={handleChange} />

        <label htmlFor='comment'>Коментар (по избор)</label>
        <textarea style={{ background: '#fef8ec' }} name='comment' id='comment' value={formData.comment} onChange={handleChange} rows={3} />

        {error && (
          <p
            style={{
              color: 'red',
              fontWeight: '700',
              fontSize: '1.2rem',
              margin: 0,
              padding: 0,
            }}
          >
            {error}
          </p>
        )}

        <CustomModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <Typography variant='h6'>Успешно направихте своята резервация.</Typography>
          <CustomButton
            text='Затвори'
            onClick={() => setIsModalOpen(false)}
            color='azure'
            fontColor='#111'
          />
        </CustomModal>

        <button disabled={isLoading} type='submit' className={styles.submit}>{isLoading ? 'Моля изчакайте...' : 'Потвърди'}</button>
      </>
    )
  }

  const isLoadingState = isLoading || loading

  return (
    <section className={styles.wrapper}>
      <div className={styles.overlay}>
        <form className={styles.form} onSubmit={handleSubmit}>
          {isLoadingState && <p>Моля изчакайте...</p>}
          {isUpdating && !isIdNumber && !isLoadingState && renderInvalidNumberForUpdatingReservation()}
          {isUpdating && !isLoadingState && renderForm()}
          {!isUpdating && !isLoadingState && renderForm()}
        </form>
      </div>
    </section>
  )
}
