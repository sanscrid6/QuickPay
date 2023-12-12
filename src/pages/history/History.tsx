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
import { useEffect } from 'react';

function HistoryPage() {
  const filter = useUnit($filter);
  const payments = useUnit($filteredPayments);
  const categories = useUnit($categoryList);

  useEffect(() => {
    getPaymentsFx();
  }, []);

  console.log(payments);

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
      <HistoryList items={payments} />
    </div>
  );
}

export default HistoryPage;
