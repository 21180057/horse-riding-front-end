import { useState } from 'react'
import styles from './LoginForm.module.css'

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Logging in with:', formData)
    alert('Успешен вход!')
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.overlay}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2 className={styles.title}>Вход</h2>

          <div className={styles.formControl}>
            <label htmlFor="email">Имейл</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formControl}>
            <label htmlFor="password">Парола</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className={styles.button}>Вход</button>
        </form>
      </div>
    </div>
  )
}
