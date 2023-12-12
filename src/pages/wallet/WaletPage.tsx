import { useUnit } from 'effector-react';
import WalletList from './components/wallet-list/WalletList';
import { $walletList, getWalletListFx } from '../../state/user/user';
import { Button } from '@mui/material';
import { ModalType, openModal } from '../../state/modal/modal';
import styles from './wallet.module.css';
import { useEffect } from 'react';

export function WalletPage() {
  const wallets = useUnit($walletList);

  useEffect(() => {
    getWalletListFx();
  }, []);

  function addWalletHandler() {
    openModal({ type: ModalType.AddWallet, data: { type: 'ADD' } });
  }

  return (
    <div className={styles.container}>
      <WalletList items={wallets} />
      <Button onClick={addWalletHandler}>Добавить кошелек</Button>
    </div>
  );
}
