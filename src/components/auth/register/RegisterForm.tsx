import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './RegisterForm.module.css'
import { END_POINTS } from '../../../constants'

const INITIAL_FORMDATA = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
  role: '',
}

export default function RegisterForm() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState(INITIAL_FORMDATA)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
  const isAdmin = currentUser?.role === 'admin'

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setError('')
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const validateFormData = (name: string, email: string, password: string, confirmPassword: string, phone: string) => {
    if (name.trim().length < 6) {
      setError('Името трябва да е поне 6 символа!')
      return false
    }
    if (!email.includes('@') || email.length < 8) {
      setError('Невалиден имейл!')
      return false
    }
    if (password.length < 5) {
      setError('Паролата трябва да е поне 5 символа!')
      return false
    }
    if (password !== confirmPassword) {
      setError('Паролите не съвпадат!')
      return false
    }
    if (phone.length < 10) {
      setError('Невалиден телефонен номер!')
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const { name, email, password, confirmPassword, phone } = formData
    const isValidData = validateFormData(name, email, password, confirmPassword, phone)
    if (!isValidData) return
    try {
      const endpoint = isAdmin ? END_POINTS.adminRegister : END_POINTS.register
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          FullName: name,
          Email: email,
          Password: password,
          PhoneNumber: phone,
          Role: formData.role || 'user',
        }),
      })

      if (!response.ok) {
        const errorMsg = await response.text()
        setError(errorMsg)
        return
      }
    } catch (e) {
      console.log(e)
      setError('Грешка при регистрацията, моля опитайте отново.')
      return
    } finally {
      setIsLoading(false)
    }

    if (!isAdmin) {
      localStorage.setItem('currentUser', JSON.stringify({ name, email }))
    }
    alert('Успешна регистрация!')
    setFormData(INITIAL_FORMDATA)
    navigate('/')
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.overlay}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2 className={styles.title}>Регистрация</h2>

          <div className={styles.formControl}>
            <label htmlFor='name'>Име и фамилия</label>
            <input
              id='name'
              name='name'
              type='text'
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formControl}>
            <label htmlFor='email'>Имейл</label>
            <input
              id='email'
              name='email'
              type='email'
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {isAdmin && (
            <div className={styles.formControl}>
              <label htmlFor='role'>Роля</label>
              <select
                id='role'
                name='role'
                value={formData.role}
                onChange={handleChange}
              >
                <option value='user'>Потребител</option>
                <option value='instructor'>Инструктор</option>
              </select>
            </div>
          )}

          <div className={styles.formControl}>
            <label htmlFor='password'>Парола</label>
            <input
              id='password'
              name='password'
              type='password'
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formControl}>
            <label htmlFor='confirmPassword'>Потвърди парола</label>
            <input
              id='confirmPassword'
              name='confirmPassword'
              type='password'
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formControl}>
            <label htmlFor='phone'>Телефон</label>
            <input
              id='phone'
              name='phone'
              type='tel'
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          {error && <p style={{ color: 'red', fontWeight: '700', fontSize: '1.2rem', margin: 0, padding: 0 }}>{error}</p>}
          <button type='submit' className={styles.button}>{isLoading ? 'Моля изчакайте...' : 'Регистрация'}</button>
          <span style={{ fontWeight: '700', color: '#111111cd' }}>
            Вече имате регистрация?
            <Link className={styles.link} to='/login'> Влезте сега.</Link>
          </span>
        </form>
      </div>
    </div>
  )
}
