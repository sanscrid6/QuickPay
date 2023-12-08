import { List } from '@mui/material';
import HistoryCard from '../history-card/HistoryCard';
import { Payment } from '../../../../state/history/history';

type HistoryListProps = {
  items: Payment[];
};

function HistoryList({ items }: HistoryListProps) {
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {items.map((item) => (
        <HistoryCard key={item.id} {...item} />
      ))}
    </List>
  );
}

export default HistoryList;
