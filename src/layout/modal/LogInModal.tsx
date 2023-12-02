import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { $modal, ModalType, closeModal } from '../../state/modal';
import { useStore } from 'effector-react';
import { FormBuilder } from '../../utils/form-builder/FormBuilder';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { loginFx } from '../../state/user';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export function LogInModal() {
  const modal = useStore($modal);
  const pending = useStore(loginFx.pending);

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

    await loginFx(data);
    closeModal();
  }

  return (
    <Dialog open={modal === ModalType.LogIn} onClose={closeHandler}>
      <form onSubmit={handleSubmit(submit)}>
        <DialogTitle>Вход</DialogTitle>
        <DialogContent>
          <DialogContentText>Введите данные, чтобы войти</DialogContentText>

          <FormBuilder
            fields={[
              {
                name: 'email',
                type: 'email',
                label: 'Эл. почта',
              },
              {
                name: 'password',
                type: 'password',
                label: 'Пароль',
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
