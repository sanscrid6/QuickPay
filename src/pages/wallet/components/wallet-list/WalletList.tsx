import { List } from '@mui/material';
import WalletCard from '../wallet-card/WalletCard';
import { Wallet } from '../../../../state/user';

type WalletListProps = {
  items: Wallet[];
};

function WalletList({ items }: WalletListProps) {
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {items.map((item) => (
        <WalletCard key={item.id} {...item} />
      ))}
    </List>
  );
}

export default WalletList;
