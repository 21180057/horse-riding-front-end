import { Link } from "react-router-dom";
import styles from './HorsesList.module.css'
import ImageCard from "../common/ImageCard";

import { HORSES } from "../../data/horses";

export default function HorsesList() {
  return (
    <ul className={styles.horses__list}>
      {HORSES.map((horse) => (
        <Link key={horse.id} to={`/horses/${horse.id}`}>
          <ImageCard
            name={horse.name}
            url={horse.imagePaths[0]}
          />
        </Link>
      ))}
    </ul>
  )
}
