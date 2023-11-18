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

const schema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
    passwordAgain: z.string().min(6),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.passwordAgain) {
      ctx.addIssue({
        path: ['passwordAgain'],
        code: z.ZodIssueCode.custom,
        message: 'Passwords missmatch',
      });
    }
  });

export function SignInModal() {
  const modal = useStore($modal);

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

  function submit(data: z.infer<typeof schema>) {}

  return (
    <Dialog open={modal === ModalType.SignIn} onClose={closeHandler}>
      <form onSubmit={handleSubmit(submit)}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>

          <FormBuilder
            fields={[
              {
                name: 'email',
                type: 'email',
                label: 'Email',
              },
              {
                name: 'password',
                type: 'password',
                label: 'Password',
              },
              {
                name: 'passwordAgain',
                type: 'password',
                label: 'Password again',
              },
            ]}
            register={register}
            errors={errors}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeHandler}>Cancel</Button>
          <Button type="submit">Subscribe</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
