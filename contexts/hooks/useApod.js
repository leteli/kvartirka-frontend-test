import { useContext } from 'react';
import ApodContext from '../ApodContext.js';

const useApod = () => useContext(ApodContext);

export default useApod;
