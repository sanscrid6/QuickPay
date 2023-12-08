import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { $modal, ModalType, closeModal } from '../../state/modal/modal';
import { useUnit } from 'effector-react';
import { FormBuilder } from '../../utils/form-builder/FormBuilder';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { $walletList, updateWalletFx } from '../../state/user/user';

const schema = z.object({
  amount: z.string(),
});

export function AddMoneyModal() {
  const modal = useUnit($modal);
  const pending = useUnit(updateWalletFx.pending);
  const wallets = useUnit($walletList);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });

  function closeHandler() {
    reset();
    closeModal();
  }

  async function submit(data: z.infer<typeof schema>) {
    if (pending) return;

    const { id } = z.object({ id: z.string() }).parse(modal?.data);
    const wallet = wallets.find((w) => w.id === id);

    if (!wallet) {
      throw new Error(`cant find wallet with id ${id}`);
    }

    await updateWalletFx({
      ...wallet,
      amount: +data.amount + wallet.amount,
      id,
    });
    closeHandler();
  }

  return (
    <Dialog open={modal?.type === ModalType.AddMoney} onClose={closeHandler}>
      <form onSubmit={handleSubmit(submit)}>
        <DialogTitle>Пополнить кошелек</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Введите сумму в BYN, чтобы пополнить кошелек
          </DialogContentText>

          <FormBuilder
            fields={[
              {
                name: 'amount',
                type: 'number',
                label: 'Сумма',
              },
            ]}
            register={register}
            errors={errors}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeHandler}>Отмена</Button>
          <Button type="submit">Подтвердить</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
