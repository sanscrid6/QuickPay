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
import { $user } from '../../state/user';
import { useState } from 'react';
import { Input } from '../../state/tree/types';
import InputForm from './components/InputForm/InputForm';
import { addServiceFx } from '../../state/service/service';

const schema = z.object({
  description: z.string().min(10),
  title: z.string().min(3),
});

type FormInput = Input & {
  id: string;
};

export function AddServiceModal() {
  const modal = useUnit($modal);
  const pending = useUnit(addServiceFx.pending);
  const user = useUnit($user);

  const [inputs, setInputs] = useState<FormInput[]>([]);

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

  function addInput() {
    setInputs((prev) => [
      ...prev,
      {
        id: window.crypto.randomUUID(),
        name: '',
        label: '',
        type: 'text',
      },
    ]);
  }

  function changeInput(id: string) {
    return (data: Partial<Input>) =>
      setInputs((prev) => {
        const inputIndex = prev.findIndex((i) => i.id === id);
        prev[inputIndex] = { ...prev[inputIndex], ...data };

        return [...prev];
      });
  }

  function deleteInput(id: string) {
    return () => setInputs((prev) => prev.filter((i) => i.id !== id));
  }

  async function submit(data: z.infer<typeof schema>) {
    if (pending) return;

    const folder = z.object({ folderId: z.string() }).parse(modal?.data);
    console.log(folder);

    await addServiceFx({
      ...data,
      ...folder,
      body: JSON.stringify(
        inputs.map((i) => ({ type: i.type, label: i.label, name: i.name })),
      ),
      userId: user!.id,
    });
    closeModal();
  }

  return (
    <Dialog
      open={modal?.type === ModalType.AddService}
      onClose={closeHandler}
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit(submit)}>
        <DialogTitle>Добавить услугу</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Введите данные, чтобы добавить услугу
          </DialogContentText>

          <FormBuilder
            fields={[
              {
                name: 'title',
                type: 'text',
                label: 'Название',
              },
              {
                name: 'description',
                type: 'text',
                label: 'Описание',
              },
            ]}
            register={register}
            errors={errors}
          />

          {inputs.map(({ label, type, name, id }) => (
            <InputForm
              key={id}
              label={label}
              name={name}
              type={type}
              deleteInput={deleteInput(id)}
              changeInput={changeInput(id)}
            />
          ))}
          <Button onClick={addInput} sx={{ marginTop: '1rem' }}>
            Добавить поля ввода
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeHandler}>Отмена</Button>
          <Button type="submit">Подтвердить</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
