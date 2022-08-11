import { useState } from 'react';
import AsteroidsContext from '../contexts/AsteroidsContext.js';

const AsteroidsProvider = ({ children }) => {
  const [asteroids, setState] = useState([]);
  const setAsteroids = (data) => setState([...asteroids, ...data]);
  const getInfoById = (id) => asteroids.find((item) => item.id === id); 

  const value = { asteroids, setAsteroids, getInfoById };

  return (
    <AsteroidsContext.Provider value={value}>
      {children}
    </AsteroidsContext.Provider>
  );
};

export default AsteroidsProvider;
