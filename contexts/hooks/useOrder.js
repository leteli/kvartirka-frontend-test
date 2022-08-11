import { useContext } from 'react';
import OrderContext from '../OrderContext.js';

const useOrder = () => useContext(OrderContext);

export default useOrder;
