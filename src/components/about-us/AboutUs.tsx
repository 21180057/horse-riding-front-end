import image from '/images/lageri/l3.jpg'
import styles from './AboutUs.module.css'
import { Link } from 'react-router-dom'

export default function AboutUs() {
  return (
    <section className={styles.section}>
      <img src={image} alt="environment" className={styles.image} />
      <div className={styles.textOverlay}>
        <h1>За нас</h1>
        <h1>Конна база Див Чифлик</h1>
        <p>Предлага на своите клиенти обучение в езда, любителска разходка с коне сред природата  и обучение на коне, така също и организирани конни преходи с любов подбрани от нас и даващи възможност за неповторимо изживяване.</p>
        <p>Каним Ви да станете участвици в приключение и да се радваме заедно не само на великолепието на природата, но и на богатството на културно – историческото наследство по нашите земи.</p>
        <p>Конна база Ездул се намира в покрайнините на  Хисаря -град с богата хилядолетна история , известен с вълшебните си лечебни извори и изключително мек климат, безкрайните си красиви паркове, Римските терми –  едни от малкото запазени на Балканския полуостров и, разбира се, не на последно място останките от архитектурата на римския град Диоклецианопол и неговата крепостна стена, Амфитеатъра и други забележителности.</p>
        <p>За нас всеки клиент е наш любим гост!</p>
        <div className={styles.buttonContainerStyles}>
          <Link to='/horses'><button className={styles.buttonStyles}>Конете</button></Link>
          <Link to='/instructors'><button className={styles.buttonStyles}>Инструктори</button></Link>
        </div>
      </div>
    </section>
  )
}
