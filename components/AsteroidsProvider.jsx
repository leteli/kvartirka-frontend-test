import { useState } from 'react';
import AsteroidsContext from '../contexts/AsteroidsContext.js';

const AsteroidsProvider = ({ children }) => {
  const [asteroids, setState] = useState([]);
  const setAsteroids = (data) => {
    const uniqueData = data.filter((item) => !asteroids.some((el) => el.id === item.id));
    setState([...asteroids, ...uniqueData]);
  };

  const getInfoById = (id) => asteroids.find((item) => item.id === id);
  const getHazardous = () => asteroids.filter((item) => item.is_potentially_hazardous_asteroid);

  const value = { asteroids, setAsteroids, getInfoById, getHazardous };

  return (
    <AsteroidsContext.Provider value={value}>
      {children}
    </AsteroidsContext.Provider>
  );
};

export default AsteroidsProvider;
