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
import { $user } from '../../state/user/user';
import { addFolderFx } from '../../state/tree/tree';

const schema = z.object({
  title: z.string().min(3),
});

export function AddFolderModal() {
  const modal = useUnit($modal);
  const pending = useUnit(addFolderFx.pending);
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

    const folder = z.object({ folderId: z.string() }).parse(modal?.data);

    await addFolderFx({
      ...data,
      ...folder,
      userId: user!.id,
    });
    closeHandler();
  }

  return (
    <Dialog open={modal?.type === ModalType.AddFolder} onClose={closeHandler}>
      <form onSubmit={handleSubmit(submit)}>
        <DialogTitle>Добавить попку</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Введите данные, чтобы добавить папку
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
