import { useState } from 'react';
import ApodContext from '../contexts/ApodContext.js';

const ApodProvider = ({ children }) => {
  const [apodUrl, setUrl] = useState('');
  const setApodUrl = (url) => setUrl(url);
  const value = { apodUrl, setApodUrl };

  return (
    <ApodContext.Provider value={value}>
      {children}
    </ApodContext.Provider>
  );
};

export default ApodProvider;
