import Head from 'next/head';
import Image from 'next/image';
import axios from 'axios';
import cn from 'classnames';
import { uniqueId } from 'lodash';

import Header from '../../components/Header.jsx';
import Footer from '../../components/Footer.jsx';
import useApod from '../../contexts/hooks/useApod.js';
import useOrder from '../../contexts/hooks/useOrder.js';
import useAsteroids from '../../contexts/hooks/useAsteroids.js';
import formatDistance from '../../lib/formatDistance.js';
import { formatDateTime } from '../../lib/formatDate.js';
import getFormattedData from '../../lib/getFormattedData.js';

import styles from '../../styles/Asteroid.module.css';

const Asteroid = ({ data }) => {
  const { apodUrl } = useApod();
  const apodData = { url: apodUrl };
  const { getInfoById } = useAsteroids();
  const asteroidData = getInfoById(data.id);
  const asteroid = getFormattedData(asteroidData);

  const { addAsteroid } = useOrder();
  const add = () => addAsteroid(asteroidData);

  const planets = {
    Merc: 'Меркурий',
    Venus: 'Венера',
    Earth: 'Земля',
    Mars: 'Марс',
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Asteroid Page</title>
        <meta name="description" content="Armageddon V2 Website" />
      </Head>
      <Header data={apodData} page="asteroid" />
      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.card}>
            <div>
              <Image
                src="/Asteroid.png"
                alt="Иконка опасности астероида"
                layout="fixed"
                width={150}
                height={150}
                className={styles.image}
              ></Image>
              <div className={cn({
                  [styles.hazardText]: true,
                  [styles.hazardous]: data.is_potentially_hazardous_asteroid,
                  [styles.safe]: !data.is_potentially_hazardous_asteroid,
                })}>
                {asteroid.hazard}
              </div>
            </div>
            <div className={styles.info}>
              <h1 className={styles.title}>Астероид{' '}{asteroid.name}</h1>
              <div className={styles.infoLine}><span>Диаметр</span><span>{asteroid.dMin}{' '}-{' '}{asteroid.dMax} м.</span></div>
              <div className={styles.infoLine}><span>Cближение</span><span>{asteroid.date} г.</span></div>
              <div className={styles.infoLine}><span>До Земли</span><span>{asteroid.kilometers} км. / {asteroid.lunar}л.о.</span></div>
              <button onClick={add} className={styles.button}>Уничтожить</button>
            </div>
          </div>
          <div>
            <h2 className={cn(styles.title, styles.approachesTitle)}> Все сближения астероида</h2>
            <table className={styles.approaches}>
              <thead>
                <tr>
                  <th rowSpan="2">Относительная скорость,<br/> км / с</th>
                  <th rowSpan="2">Время сближения</th>
                  <th colSpan="2">Расстояние до Земли</th>
                  <th rowSpan="2">Центр вращения</th>
                </tr>
                <tr>
                  <th>В километрах</th>
                  <th>В лунных орбитах</th>
                </tr>
              </thead>
              <tbody>
                {data.close_approach_data.map((approach) => {
                  const id = uniqueId();
                  const km = Math.round(approach.miss_distance.kilometers);
                  const lunar = Math.round(approach.miss_distance.lunar);
                  console.log(approach);
                  return (
                    <tr key={id}>
                      <td>{Math.round(approach.relative_velocity.kilometers_per_second)}</td>
                      <td>{formatDateTime(approach.close_approach_date_full)}</td>
                      <td>{formatDistance(km)}</td>
                      <td>{formatDistance(lunar)}</td>
                      <td>{planets[approach.orbiting_body]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export const getServerSideProps = async (context) => {
    const { slug } = context.query;
    console.log(slug);
    const { data } = await axios.get(`https://api.nasa.gov/neo/rest/v1/neo/${slug}?api_key=itYBJlHNMAh73Nr7O3xa8DdLLVQu91PEoGXlJOa6`);
    console.log(data);
    return {
      props: { data },
    };
};

export default Asteroid;
