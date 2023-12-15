import { useUnit } from 'effector-react';
import SelectDropdown from '../../components/select/SelectDropdown';
import {
  $filter,
  $filteredPayments,
  getPaymentsFx,
  setFilter,
} from '../../state/history/history';
import HistoryList from './components/history-list/HistoryList';
import styles from './history.module.css';
import { $categoryList } from '../../state/service/service';
import { useEffect, useState } from 'react';
import { TextField, Typography } from '@mui/material';

function formatDate(d: Date) {
  const date = new Date(new Date(d).getTime());

  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}T${date
    .getHours()
    .toString()
    .padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}

function toTZ(d: Date) {
  return new Date(
    new Date(d).getTime() + new Date().getTimezoneOffset() * -60_000,
  );
}

function HistoryPage() {
  const filter = useUnit($filter);
  const payments = useUnit($filteredPayments);
  const categories = useUnit($categoryList);

  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());

  useEffect(() => {
    const min = payments.reduce(
      (acc, curr) =>
        acc > new Date(curr.dateTime) ? new Date(curr.dateTime) : acc,
      new Date(),
    );
    const max = payments.reduce(
      (acc, curr) =>
        acc < new Date(curr.dateTime) ? new Date(curr.dateTime) : acc,
      new Date(-8640000000000000),
    );

    setStart(toTZ(min));
    setEnd(toTZ(max));
  }, [payments]);

  useEffect(() => {
    getPaymentsFx();
  }, []);

  const realPayment = payments.filter(
    (p) =>
      toTZ(new Date(p.dateTime)) <= end && toTZ(new Date(p.dateTime)) >= start,
  );
  const all = realPayment.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className={styles.container}>
      <SelectDropdown
        items={[
          { value: 'all', label: 'Все категории' },
          ...categories.map((c) => ({ value: c.id, label: c.title })),
        ]}
        name="Категория"
        value={filter}
        setValue={setFilter}
      />
      <div className={styles.date}>
        <TextField
          value={formatDate(start)}
          onChange={(e) => setStart(new Date(e.target.value))}
          type="datetime-local"
        />
        <TextField
          value={formatDate(end)}
          onChange={(e) => setEnd(new Date(e.target.value))}
          type="datetime-local"
        />
        <Typography variant="subtitle2">Потрачено {all} BYN</Typography>
      </div>

      <HistoryList items={realPayment} />
    </div>
  );
}

export default HistoryPage;
