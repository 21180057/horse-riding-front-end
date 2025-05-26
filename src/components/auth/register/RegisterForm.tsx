import { useState } from 'react'
import styles from './RegisterForm.module.css'
import { Link } from 'react-router-dom'

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      alert('Паролите не съвпадат!')
      return
    }

    console.log('Registering user:', formData)
    alert('Успешна регистрация!')
    // TODO: send to backend
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.overlay}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2 className={styles.title}>Регистрация</h2>

          <div className={styles.formControl}>
            <label htmlFor="name">Име и фамилия</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formControl}>
            <label htmlFor="email">Имейл</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formControl}>
            <label htmlFor="password">Парола</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formControl}>
            <label htmlFor="confirmPassword">Потвърди парола</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formControl}>
            <label htmlFor="phone">Телефон (по избор)</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className={styles.button}>Регистрация</button>
          <span style={{ fontWeight: '700', color: "#111111cd" }}>
            Вече имате регистрация?
            <Link className={styles.link} to='/login'> Влезте сега.</Link>
          </span>
        </form>
      </div>
    </div>
  )
}
