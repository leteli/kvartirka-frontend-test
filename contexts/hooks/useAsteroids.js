import { useContext } from 'react';
import AsteroidsContext from '../AsteroidsContext.js';

const useAsteroids = () => useContext(AsteroidsContext);

export default useAsteroids;
