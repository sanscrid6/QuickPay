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
import { registerFx } from '../../state/user/user';

const schema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
    passwordAgain: z.string().min(6),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    birthDate: z.string(),
    phoneNumber: z.string().regex(/^\+375(17|29|33|44)\d{7}$/),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.passwordAgain) {
      ctx.addIssue({
        path: ['passwordAgain'],
        code: z.ZodIssueCode.custom,
        message: 'Пароли не совпадают',
      });
    }

    if (
      Date.now() - new Date(val.birthDate).getTime() <
      365 * 18 * 24 * 3600 * 1000
    ) {
      ctx.addIssue({
        path: ['birthDate'],
        code: z.ZodIssueCode.custom,
        message: 'Не корректная дата рождения',
      });
    }
  });

export function SignInModal() {
  const modal = useUnit($modal);
  const pending = useUnit(registerFx.pending);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });

  function closeHandler() {
    reset();
    closeModal();
  }

  async function submit(data: z.infer<typeof schema>) {
    console.log(data.birthDate);

    return;
    if (pending) return;

    await registerFx(data);
    closeHandler();
  }

  return (
    <Dialog open={modal?.type === ModalType.SignIn} onClose={closeHandler}>
      <form onSubmit={handleSubmit(submit)}>
        <DialogTitle>Зарегистрироваться</DialogTitle>
        <DialogContent>
          <DialogContentText>Введите данные для регистрации</DialogContentText>

          <FormBuilder
            fields={[
              {
                name: 'email',
                type: 'email',
                label: 'Эл. почта',
                autoFocus: true,
              },
              {
                name: 'password',
                type: 'password',
                label: 'Пароль',
              },
              {
                name: 'passwordAgain',
                type: 'password',
                label: 'Пароль еще раз',
              },
              {
                name: 'firstName',
                type: 'text',
                label: 'Имя',
              },
              {
                name: 'lastName',
                type: 'text',
                label: 'Фамилия',
              },
              {
                name: 'birthDate',
                type: 'date',
              },
              {
                name: 'phoneNumber',
                type: 'text',
                label: 'Номер телефона',
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
