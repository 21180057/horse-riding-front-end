import { Link } from "react-router-dom";
import styles from './HorsesList.module.css'
import ImageCard from "../common/ImageCard";
import { useHorses } from "../../hooks/useHorses";

export default function HorsesList() {
  const { horses } = useHorses()

  return (
    <ul className={styles.horses__list}>
      {horses.map((horse) => (
        <Link key={horse.id} to={`/horses/${horse.id}`}>
          <ImageCard
            name={horse.name}
            url={horse.imagePaths[0]}
            id={horse.id.toString()}
            type='horse'
          />
        </Link>
      ))}
    </ul>
  )
}
