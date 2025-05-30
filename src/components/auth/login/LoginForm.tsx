import { useState } from 'react'
import styles from './LoginForm.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { END_POINTS } from '../../../constants'

export default function LoginPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('')
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { email, password } = formData
    if (!email || !password) {
      setError('Моля попълнете всички полета!')
      return
    }
    if (password.length < 5) {
      setError('Паролата трябва да е поне 5 символа!')
      return
    }
    if (!email.includes('@') || email.length < 8) {
      setError('Моля въведете валиден имейл!')
      return
    }

    try {
      setIsLoading(true)
      const response = await fetch(END_POINTS.login, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorMsg = await response.text()
        setError(errorMsg)
        return
      }
      const data = await response.json()
      localStorage.setItem('currentUser', JSON.stringify(data))
    } catch (e) {
      console.log(e)
      setError('Възникна грешка при влизането в профила. Моля, опитайте отново.')
      return
    } finally {
      setIsLoading(false)
    }

    setFormData({ email: '', password: '' })
    navigate('/')
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
          {error && <p style={{ color: 'red', fontWeight: '700', fontSize: '1.2rem', margin: 0, padding: 0 }}>{error}</p>}
          <button type="submit" className={styles.button} disabled={isLoading}>{isLoading ? "Моля изчакайте" : "Вход"}</button>
          <span style={{ fontWeight: '700', color: "#111111cd" }}>
            Не сте регистрирани все още?
            <Link className={styles.link} to='/register'> <div>Регистрирайте се сега!</div></Link>
          </span>
        </form>
      </div>
    </div>
  )
}
