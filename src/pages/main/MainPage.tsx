import { Typography } from '@mui/material';
import styles from './main-page.module.css';

export function MainPage() {
  return (
    <main className={styles.container}>
      <Typography variant="h2" component="div">
        Быстрые платежи с QuickPay
      </Typography>
    </main>
  );
}
