import Head from 'next/head';
import cn from 'classnames';
import { useState, useEffect } from 'react';
import axios from 'axios';


import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import AsteroidCard from '../components/AsteroidCard.jsx';
import useApod from '../contexts/hooks/useApod.js';
import useAsteroids from '../contexts/hooks/useAsteroids.js';
import { getDaysForUrl } from '../lib/formatDate.js';

import styles from '../styles/Home.module.css';

const Home = ({ apodData, asteroidsData }) => {
  const nearEarthObjects = Object.values(asteroidsData.near_earth_objects).flat();
  const { setApodUrl } = useApod();
  const { asteroids, setAsteroids, getHazardous } = useAsteroids();

  const [filter, setFilter] = useState(false);
  const [unit, setUnit] = useState('kilometers');
  const [fetching, setFetching] = useState(false);
  const [nextLink, setNextLink] = useState(asteroidsData.links.next);

  useEffect(() => {
    setApodUrl(apodData.url);
    setAsteroids(nearEarthObjects);
  }, []);

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return () => document.removeEventListener('scroll', scrollHandler);
  }, []);

  useEffect(() => {
    const fetchByScroll = async () => {
      if (fetching) {
        // const arr = nextLink.split('//');
        // arr[0] = 'https:';
        // const secureLink = arr.join('//');
        const { data } = await axios.get(secureLink);
        const nearEarthObjects = Object.values(data.near_earth_objects).flat();
        setAsteroids(nearEarthObjects);
        setNextLink(data.links.next);
        setFetching(false);
      }
    };
    fetchByScroll();
  }, [fetching]);

  const scrollHandler = ({ target }) => {
    const totalHeight = target.documentElement.scrollHeight;
    const scrolled = target.documentElement.scrollTop + window.innerHeight;
    if (totalHeight - scrolled < 100) {
      setFetching(true);
    }
  };

  const getRenderData = () => {
    if (filter) {
      return getHazardous();
    }
    if (asteroids.length > 0) {
      return asteroids;
    } 
    return nearEarthObjects;
  };

  const click = () => unit === 'kilometers' ? setUnit('lunar') : setUnit('kilometers');

  return (
    <div className={styles.container}>
      <Head>
        <title>Armageddon V2</title>
        <meta name="description" content="Armageddon V2 Website" />
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header data={apodData} page="home" />
      <main className={styles.main}>
        <h2 className={styles.title}>Ближайшие подлёты</h2>
        <div className={styles.settings}>
          <div className={styles.units}>
            <span>Отображать расстояние:{' '}</span>
            <div>
            <button onClick={click} className={cn({
              [styles.option]: true,
              [styles.active]: unit === 'kilometers',
              [styles.inactive]: unit === 'lunar',
            })}>в километрах</button>
            {' '}|{' '}
            <button onClick={click} className={cn({
              [styles.option]: true,
              [styles.active]: unit === 'lunar',
              [styles.inactive]: unit === 'kilometers',
            })}>в лунных орбитах</button>
            </div>
          </div>
          <label htmlFor="dangerous" className={styles.checkbox}>
            <input onChange={() => setFilter(!filter)} id="dangerous" className={styles.input} type="checkbox"/>
            <span>Показать только опасные</span>
          </label>
        </div>
        <div className={styles.asteroids}>
          {getRenderData().map(asteroid => (
              <AsteroidCard key={asteroid.id} data={asteroid} unit={unit} />
            ))}
        </div>
      </main>
      <Footer />
    </div>
  )
};

export const getServerSideProps = async () => {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  try {
    const { today, tomorrow } = getDaysForUrl();
    const apodRes = await axios.get(`https://api.nasa.gov/planetary/apod?thumbs=true&api_key=${apiKey}`);
    const asteroidsRes = await axios.get(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${tomorrow}&api_key=${apiKey}`);
    return {
      props: {
        apodData: apodRes.data,
        asteroidsData: asteroidsRes.data,
      },
    };
  } catch (err) {
    console.log(err.message);
  }
};

export default Home;
