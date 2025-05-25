import { Link } from 'react-router-dom'
import styles from './ServicesPage.module.css'

export default function ServicesPage() {
  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Какво предлагаме</h1>

      <div className={styles.service}>
        <h2 className={styles.heading}>🐴 Индивидуални и групови тренировки</h2>
        <p className={styles.text}>
          Независимо дали сте начинаещ или напреднал, при нас ще намерите подходящ урок. Избирате предпочитан инструктор, ден и час — всичко става онлайн, без обаждания.
        </p>
      </div>

      <div className={styles.service}>
        <h2 className={styles.heading}>📅 Онлайн резервации в реално време</h2>
        <p className={styles.text}>
          Системата ни позволява да видите свободните часове и инструктори в реално време и да направите бърза резервация.
        </p>
        <Link className={styles.link} to='/reservation'>Резервирай сега!</Link>
      </div>

      <div className={styles.service}>
        <h2 className={styles.heading}>👨‍🏫 Избор на инструктор</h2>
        <p className={styles.text}>
          Всеки инструктор има опит и индивидуален подход. Можете да разгледате профили и да изберете подходящ човек според стила и вашите нужди.
        </p>
      </div>

      <div className={styles.service}>
        <h2 className={styles.heading}>🏕️ Детски летни лагери</h2>
        <p className={styles.text}>
          Провеждаме организирани лагери с езда, игри, обучение и грижа за животните. Родителите могат да запишат децата си онлайн и да посочат дни на участие. Системата проследява информация и плащания.
        </p>
        <Link className={styles.link} to='/campform'>Запиши своето дете!</Link>
      </div>

      <div className={styles.service}>
        <h2 className={styles.heading}>🌳 Разходки сред природата</h2>
        <p className={styles.text}>
          За опитни ездачи предлагаме разходки извън базата. Насладете се на спокойствие, природа и връзка с коня — под надзора на инструктор.
        </p>
      </div>

      <div className={styles.service}>
        <h2 className={styles.heading}>📞 Централизирана контактна информация</h2>
        <p className={styles.text}>
          Всички данни на клиентите и родителите се съхраняват сигурно в системата. При нужда бързо се открива телефон или справка за плащане, без хаос с листчета или обърквания.
        </p>
      </div>
    </section>
  )
}
