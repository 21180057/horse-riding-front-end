import HorseItem from "./HorseItem";
import styles from './HorsesList.module.css'

const HORSES = [
  {
    name: 'Хайдутин',
    url: 'https://robohash.org/horse1.png?set=set4&size=150x150'
  },
  {
    name: 'Сивушка',
    url: 'https://robohash.org/horse2.png?set=set4&size=150x150'
  },
  {
    name: 'Вихър',
    url: 'https://robohash.org/horse3.png?set=set4&size=150x150'
  },
  {
    name: 'Зора',
    url: 'https://robohash.org/horse4.png?set=set4&size=150x150'
  },
]

export default function HorsesList() {
  return (
    <ul className={styles.horses__list}>
      {HORSES.map((horse) => (
        <HorseItem
          key={horse.name}
          name={horse.name}
          url={horse.url}
        />
      ))}
    </ul>
  )
}
