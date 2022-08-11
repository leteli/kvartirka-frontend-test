import Head from 'next/head';

import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

import useApod from '../contexts/hooks/useApod.js';
import useOrder from '../contexts/hooks/useOrder.js';
import formatName from '../lib/formatName.js';
import formatDate from '../lib/formatDate.js';

import styles from '../styles/Order.module.css';

const Order = () => {
  const { apodUrl } = useApod();
  const apodData = { url: apodUrl };
  const { asteroids, removeAsteroid } = useOrder();
  const remove = (id) => () => removeAsteroid(id);

  console.log(asteroids);
  return (
  <div className={styles.container}>
    <Head>
      <title>Order Armageddon V2</title>
      <meta name="description" content="Armageddon V2 Website" />
    </Head>
    <Header data={apodData} page="order" />
    <main className={styles.main}>
      <div className={styles.content}>
        <h1 className={styles.title}>Астероиды на уничтожение</h1>
        <ul className={styles.list}>
          {asteroids.map((asteroid) => (
            <li className={styles.listItem} key={asteroid.id}>
              <span>Астероид {formatName(asteroid.name)}</span>
              <span>{
                asteroid.is_potentially_hazardous_asteroid
                ? 'Опасен'
                : 'Не опасен'
                }</span>
              <span>{formatDate(asteroid.close_approach_data[0].close_approach_date)}</span>
              <button onClick={remove(asteroid.id)} className={styles.delete}>Удалить</button>
            </li>
          ))}
        </ul>
        <div className={styles.order}>
          <p><b>Бригада им. Брюса Уиллиса</b><br/> уже готова к спасению планеты!</p>
          <button className={styles.button}>Отправить заказ</button>
        </div>
      </div>
    </main>
    <Footer />
  </div>
  );
};

export default Order;
