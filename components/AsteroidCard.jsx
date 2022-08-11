import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/AsteroidCard.module.css';
import formatDate from '../lib/formatDate.js';
import formatName from '../lib/formatName.js';
import formatDistance from '../lib/formatDistance.js';
import useOrder from '../contexts/hooks/useOrder.js';

const AsteroidCard = ({ data, unit }) => {
  const { addAsteroid } = useOrder();
  const add = () => addAsteroid(data);

  const date = data.close_approach_data[0].close_approach_date;
  const distance = Math.round(data.close_approach_data[0].miss_distance[unit]);
  const map = {
    kilometers: 'км',
    lunar: 'лунных орбит',
  };

  const hazardous = data.is_potentially_hazardous_asteroid;
  const image = hazardous ? 'Hazardous.png' : 'Not Hazardous.png';
  const hazard = hazardous ? 'Опасен' : 'Не опасен';

  const { meters } = data.estimated_diameter;
  const averageDiameter = (meters.estimated_diameter_min + meters.estimated_diameter_max) / 2;

  return (
    <div>
      <span>{formatDate(date)}</span>
      <div className={styles.info}>
        <Image
          src={`/${image}`}
          alt="Иконка опасности астероида"
          width={93}
          height={95}
          className={styles.image}
        ></Image>
        <div>
          <Link href="/asteroids/[slug]" as={`/asteroids/${data.id}`}>
            <a className={styles.name}>Астероид {formatName(data.name)}</a>
          </Link>
          <p>&#216; {Math.round(averageDiameter)} м</p>
          <p>&#8596; {`${formatDistance(distance)} ${map[unit]}`}</p>
          <p>{hazard}</p>
        </div>
      </div>
      <button onClick={add} className={styles.button}>Уничтожить</button>
    </div>
  )
};

export default AsteroidCard;
