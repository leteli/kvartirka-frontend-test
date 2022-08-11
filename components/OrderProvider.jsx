import { useState } from 'react';
import OrderContext from '../contexts/OrderContext.js';

const OrderProvider = ({ children }) => {
  const [list, setList] = useState([]);
  const addAsteroid = (item) => {
    if (!list.includes(item)) {
      setList([...list, item]);
    }
  };

  const removeAsteroid = (id) => {
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
  };

  const value = { asteroids: list, addAsteroid, removeAsteroid };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
