import { useState } from 'react'
import styles from './ReservationForm.module.css'

const SERVICES = ['Индивидуална езда', 'Групова езда', 'Детски лагер']
const INSTRUCTORS = ['Виктория', 'Борис', 'Ева', 'Ивайло', 'Павлета']

export default function ReservationForm() {
  const [formData, setFormData] = useState({
    service: '',
    date: '',
    time: '',
    instructor: '',
    name: '',
    phone: '',
    email: '',
    comment: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitting reservation:', formData)
    // Here you'd send the data to backend or API
    alert('Резервацията беше изпратена успешно!')
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.heading}>Направи резервация</h2>

      <label htmlFor='service'>Избери услуга</label>
      <select name="service" id='service' value={formData.service} onChange={handleChange} required>
        <option value="">-- Изберете --</option>
        {SERVICES.map((service) => (
          <option key={service} value={service}>{service}</option>
        ))}
      </select>

      <label htmlFor='date'>Дата</label>
      <input type="date" id='date' name="date" value={formData.date} onChange={handleChange} required />

      <label htmlFor='time'>Час</label>
      <input type="time" id='time' name="time" value={formData.time} onChange={handleChange} required />

      <label htmlFor='instructor'>Инструктор (по избор)</label>
      <select name="instructor" id='instructor' value={formData.instructor} onChange={handleChange}>
        <option value="">-- Без предпочитание --</option>
        {INSTRUCTORS.map((instructor) => (
          <option key={instructor} value={instructor}>{instructor}</option>
        ))}
      </select>

      <label htmlFor='name'>Име и фамилия</label>
      <input type="text" name="name" id='name' value={formData.name} onChange={handleChange} required />

      <label htmlFor='phone'>Телефон за контакт</label>
      <input type="tel" id='phone' name="phone" value={formData.phone} onChange={handleChange} required />

      <label htmlFor='email'>Имейл (по избор)</label>
      <input type="email" id='email' name="email" value={formData.email} onChange={handleChange} />

      <label htmlFor='comment'>Коментар (по избор)</label>
      <textarea name="comment" id='comment' value={formData.comment} onChange={handleChange} rows={3} />

      <button type="submit" className={styles.submit}>Изпрати резервация</button>
    </form>
  )
}
