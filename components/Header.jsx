import Link from 'next/link';

import cn from 'classnames';

import styles from '../styles/Header.module.css';

const Header = ({ data, page }) => {
  console.log(data.url);
  return (
    <header style={{ backgroundImage: `url(${data.url})`}} className={styles.header}>
      <div>
        <h1 className={styles.title}>Armageddon V2</h1>
        <p className={styles.info}>Сервис заказа уничтожения астероидов, опасно подлетающих к Земле.</p>
      </div>
      <div className={styles.nav}>
        <Link href="/">
          <a className={cn({
            [styles.active]: page === 'home',
            [styles.inactive]: page === 'order',
          })}>Астероиды</a>
        </Link>
        <Link href="/order">
          <a className={cn({
            [styles.order]: true,
            [styles.active]: page === 'order',
            [styles.inactive]: page === 'home',
          })}
        >
        Заказ</a>
        </Link>
      </div>
    </header>
  );
};

export default Header;
