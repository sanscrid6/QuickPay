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
import { $user, $walletList } from '../../state/user/user';
import { useEffect, useState } from 'react';
import { Input } from '../../state/tree/types';
import InputForm from './components/InputForm/InputForm';
import { $categoryList, addServiceFx } from '../../state/service/service';
import SelectDropdown from '../../components/select/SelectDropdown';

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
  const categories = useUnit($categoryList);
  const wallets = useUnit($walletList);

  const [inputs, setInputs] = useState<FormInput[]>([]);
  const [category, setCategory] = useState(categories[0]?.id ?? '');
  const [wallet, setWallet] = useState(wallets[0]?.id ?? '');

  useEffect(() => {
    setCategory(categories[0]?.id);
    setWallet(wallets[0]?.id);
  }, [categories, wallets]);

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

    await addServiceFx({
      ...data,
      walletId: wallet,
      categoryId: category,
      body: JSON.stringify(
        inputs.map((i) => ({ type: i.type, label: i.label, name: i.name })),
      ),
      userId: user!.id,
    });
    closeHandler();
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
          <SelectDropdown
            name="Категория"
            items={categories.map((c) => ({ value: c.id, label: c.title }))}
            value={category}
            setValue={setCategory}
          />
          <SelectDropdown
            name="Кошелек"
            items={wallets.map((c) => ({ value: c.id, label: c.title }))}
            value={wallet}
            setValue={setWallet}
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
