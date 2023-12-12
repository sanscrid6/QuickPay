import { Button, ListItem, ListItemText } from '@mui/material';
import { Wallet, deleteWalletFx } from '../../../../state/user/user';
import { ModalType, openModal } from '../../../../state/modal/modal';

type WalletCardProps = Wallet;

function WalletCard({ title, amount, id, isMain }: WalletCardProps) {
  function deleteWallethandler() {
    deleteWalletFx(id);
  }

  function addMoneyHandler() {
    openModal({ type: ModalType.AddMoney, data: { id } });
  }

  function updateWalletHandler() {
    openModal({
      type: ModalType.AddWallet,
      data: { type: 'UPDATE', name: title, id, amount },
    });
  }

  return (
    <ListItem alignItems="flex-start">
      <ListItemText
        primary={title}
        secondary={`На вашем счету ${amount} BYN`}
      />
      {!isMain && <Button onClick={deleteWallethandler}>Удалить</Button>}
      <Button onClick={addMoneyHandler}>Пополнить</Button>
      <Button onClick={updateWalletHandler}>Изменить</Button>
    </ListItem>
  );
}

export default WalletCard;
