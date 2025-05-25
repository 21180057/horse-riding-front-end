import { useState } from 'react'
import styles from './CampForm.module.css'

const AVAILABLE_DAYS = [
  '01 юли',
  '02 юли',
  '03 юли',
  '04 юли',
  '05 юли',
  '08 юли',
  '09 юли',
  '10 юли',
  '11 юли',
  '12 юли',
]

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleDayToggle = (day: string) => {
    setFormData(prev => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter(d => d !== day)
        : [...prev.days, day],
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitted camp registration:', formData)
    alert('Успешно записване за летния лагер!')
    // TODO
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.heading}>Записване за летен лагер</h2>

      <label htmlFor='childName'>Име на дете</label>
      <input
        type='text'
        name='childName'
        id='childName'
        value={formData.childName}
        onChange={handleChange}
        required
      />

      <label htmlFor='age'>Възраст</label>
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

      <label htmlFor='parentName'>Име на родител</label>
      <input
        type='text'
        name='parentName'
        id='parentName'
        value={formData.parentName}
        onChange={handleChange}
        required
      />

      <label htmlFor='phone'>Телефон за връзка</label>
      <input
        type='tel'
        name='phone'
        id='phone'
        value={formData.phone}
        onChange={handleChange}
        required
      />

      <label htmlFor='email'>Имейл</label>
      <input
        type='email'
        name='email'
        id='email'
        value={formData.email}
        onChange={handleChange}
      />

      <label>Избери дати</label>
      <div className={styles.days}>
        {AVAILABLE_DAYS.map((day) => (
          <label key={day} className={styles.dayOption}>
            <input
              type='checkbox'
              checked={formData.days.includes(day)}
              onChange={() => handleDayToggle(day)}
            />
            {day}
          </label>
        ))}
      </div>

      <label htmlFor='comment'>Коментар (по избор)</label>
      <textarea
        name='comment'
        id='comment'
        value={formData.comment}
        onChange={handleChange}
        rows={3}
      />

      <button type='submit' className={styles.submit}>Запиши</button>
    </form>
  )
}
