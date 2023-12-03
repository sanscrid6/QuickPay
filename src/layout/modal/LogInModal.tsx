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
import { loginByCodeFx, loginFx } from '../../state/user';
import { useState } from 'react';

const schemaCredentials = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const schemaCode = z.object({
  code: z.string(),
});

type Step =
  | {
      type: 'CREDENTIALS';
      schema: typeof schemaCredentials;
    }
  | {
      type: 'CODE';
      schema: typeof schemaCode;
    };

export function LogInModal() {
  const [step, setStep] = useState<Step>({
    type: 'CREDENTIALS',
    schema: schemaCredentials,
  });
  const modal = useUnit($modal);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof step.schema>>({
    resolver: zodResolver(step.schema),
  });

  function closeHandler() {
    closeModal();
    setStep({
      type: 'CREDENTIALS',
      schema: schemaCredentials,
    });
    reset();
  }

  async function submit(data: z.infer<typeof step.schema>) {
    if (step.type === 'CREDENTIALS') {
      const d = data as z.infer<typeof schemaCredentials>;

      await loginFx(d);
      setStep({
        type: 'CODE',
        schema: schemaCode,
      });
    } else {
      const d = data as z.infer<typeof schemaCode>;
      await loginByCodeFx(d);
      closeHandler();
    }
  }

  return (
    <Dialog open={modal?.type === ModalType.LogIn} onClose={closeHandler}>
      <form onSubmit={handleSubmit(submit)}>
        <DialogTitle>Вход</DialogTitle>
        <DialogContent>
          <DialogContentText>Введите данные, чтобы войти</DialogContentText>

          {step.type === 'CREDENTIALS' && (
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
          )}
          {step.type === 'CODE' && (
            <FormBuilder
              fields={[
                {
                  name: 'code',
                  type: 'text',
                  label: 'Код',
                },
              ]}
              register={register}
              errors={errors}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeHandler}>Отмена</Button>
          <Button type="submit">Подтвердить</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
