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
import { $user, createWalletFx, updateWalletFx } from '../../state/user/user';

const schema = z.object({
  title: z.string().min(3),
});

const propsSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('UPDATE'),
    name: z.string(),
    amount: z.number(),
    id: z.string(),
  }),
  z.object({
    type: z.literal('ADD'),
  }),
]);

export function AddWalletModal() {
  const modal = useUnit($modal);
  const pending = useUnit(createWalletFx.pending);
  const user = useUnit($user);

  console.log(modal?.data);

  const props = propsSchema.parse(modal?.data);

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

    if (props.type === 'ADD') {
      await createWalletFx({
        ...data,
        userId: user!.id,
      });
    } else {
      await updateWalletFx({
        title: data.title,
        amount: props.amount,
        id: props.id,
        userId: user!.id,
      });
    }

    closeHandler();
  }

  return (
    <Dialog open={modal?.type === ModalType.AddWallet} onClose={closeHandler}>
      <form onSubmit={handleSubmit(submit)}>
        <DialogTitle>
          {props.type === 'ADD' ? 'Добавить' : 'Обновить'} кошелек
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Введите данные, чтобы{' '}
            {props.type === 'ADD' ? 'добавить' : 'обновить'} кошелек
          </DialogContentText>

          <FormBuilder
            fields={[
              {
                name: 'title',
                type: 'text',
                label: 'Название',
                defaultValue: props.type === 'UPDATE' ? props.name : undefined,
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
