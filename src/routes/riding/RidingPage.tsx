import { useNavigate } from 'react-router-dom'
import styles from './RidingPage.module.css'
import HorseCount from '../../components/icons/HorseCount'
import InstructorCount from '../../components/icons/InstructorCount'


export default function RidingPage() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('currentUser') || '{}')

  console.log({ user: Object.entries(user) });

  return (
    <section className={styles.page}>
      <div className={styles.overlay}>
        <div className={styles.content}>
          <h1 className={styles.title}>Езда</h1>
          <h1 className={styles.title}>Конна база „Див чифлик“</h1>
          <p>
            В „Див чифлик“ вярваме, че ездата не е просто спорт или умение – тя е начин
            на живот, връзка с природата и усещане за истинска свобода. Независимо дали
            си начинаещ, който прави първите си стъпки в света на конете, или опитен
            ездач, търсещ нови предизвикателства, тук ще откриеш своето място.
          </p>
          <div className={styles.iconsContainer}>
            <HorseCount count={10} />
            <InstructorCount count={2} />
          </div>
          <h1 className={styles.title}>Кажете <strong>„ДА“</strong> на ездата!</h1>
          <p>
            Ездата е не просто спорт, а начин да подобрим тялото и ума си, като
            същевременно се свържем с природата. Тя укрепва мускулите, подобрява
            баланса и координацията, намалява стреса и изгражда увереност. Връзката с
            коня ни учи на търпение, доверие и отговорност, а времето, прекарано на
            открито, ни носи усещане за свобода и хармония.
          </p>
          <p style={{ textAlign: 'left', fontWeight: '800', margin: '0' }}>
            Препоръки за първо посещение:
          </p>
          <p>
            Ако посещавате базата за първи път, е добре да дойдете с удобни дрехи –
            дълги панталони и затворени обувки с нисък ток, които осигуряват стабилност
            при яздене, маратонки също биха били добър избор.
            За децата осигуряваме специални предпазни каски и жилетки, а инструкторите
            ни ще ги въведат в основните правила, за да направят преживяването приятно
            и безопасно.
          </p>

          <p style={{ textAlign: 'left', fontWeight: '800', margin: '0' }}>
            Видове езда които предлагаме:
          </p>
          <p>
            В зависимост от опита и желанията на посетителите предлагаме различни
            видове езда:
          </p>
          <ul>
            <li><strong>Разходка за начинаещи</strong> – Спокойно въведение в ездата с обучени коне и
              индивидуално внимание - две опции за този вид езда 10мин или 30 мин.
            </li>
            <li><strong>Урок в манеж</strong> – Кратка езда в оградено пространство за запознаване с конете
              и основните движения - две опции за този вид езда 30мин или 60 мин.
            </li>
            <li><strong>Природни преходи</strong> – Преходи с различни крайни дестинации, подходящи само
              за напреднали.
            </li>
          </ul>

          <p>
            Независимо дали сте тук за първи път или вече сте запалени ездачи, в „Див
            чифлик“ ще намерите своя път към света на конете.
          </p>

          <div className={styles.buttons}>
            <button onClick={() => navigate(Object.entries(user).length > 0 ? '/reservation' : '/login')}>Резервирай езда</button>
            <button onClick={() => navigate('/gallery')}>Галерия</button>
          </div>
        </div>
      </div>
    </section>
  )
}
