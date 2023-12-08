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

  return (
    <ListItem alignItems="flex-start">
      <ListItemText
        primary={title}
        secondary={`На вашем счету ${amount} BYN`}
      />
      {!isMain && <Button onClick={deleteWallethandler}>Удалить</Button>}
      <Button onClick={addMoneyHandler}>Пополнить</Button>
    </ListItem>
  );
}

export default WalletCard;
