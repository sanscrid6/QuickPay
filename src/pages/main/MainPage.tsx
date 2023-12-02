import { Typography } from '@mui/material';
import styles from './main-page.module.css';

export function MainPage() {
  //   console.log(Object.keys(schema.keyof().Values).map((name) => ({ name })));

  return (
    <main className={styles.container}>
      <Typography variant="h2" component="div">
        Быстрые платежи с QuickPay
      </Typography>
    </main>
  );
}
