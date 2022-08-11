import '../styles/globals.css';

import OrderProvider from '../components/OrderProvider.jsx';
import ApodProvider from '../components/ApodProvider.jsx';
import AsteroidsProvider from '../components/AsteroidsProvider';

function MyApp({ Component, pageProps }) {
  return (
    <ApodProvider>
      <AsteroidsProvider>
        <OrderProvider>
          <Component {...pageProps} />
        </OrderProvider>
      </AsteroidsProvider>
    </ApodProvider>
  );
}

export default MyApp
