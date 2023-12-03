import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { $modal, ModalType, closeModal } from '../../state/modal';
import { useUnit } from 'effector-react';
import { FormBuilder } from '../../utils/form-builder/FormBuilder';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { $user, createWalletFx } from '../../state/user';

const schema = z.object({
  title: z.string().min(3),
});

export function AddWalletModal() {
  const modal = useUnit($modal);
  const pending = useUnit(createWalletFx.pending);
  const user = useUnit($user);

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

    await createWalletFx({
      ...data,
      userId: user!.id,
    });
    closeHandler();
  }

  return (
    <Dialog open={modal?.type === ModalType.AddWallet} onClose={closeHandler}>
      <form onSubmit={handleSubmit(submit)}>
        <DialogTitle>Добавить кошелек</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Введите данные, чтобы добавить кошелек
          </DialogContentText>

          <FormBuilder
            fields={[
              {
                name: 'title',
                type: 'text',
                label: 'Название',
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
