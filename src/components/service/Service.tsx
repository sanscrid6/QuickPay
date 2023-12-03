import { Typography, Stack, Button, TextField } from '@mui/material';
import { FieldValues, useFieldArray, useForm } from 'react-hook-form';
import { useUnit } from 'effector-react';
import {
  $service,
  createPaymentFx,
  setService,
} from '../../state/service/service';
import { useEffect, useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import styles from './service.module.css';
import { Input } from '../../state/tree/types';
import SelectDropdown from '../select/SelectDropdown';
import { $user, $walletList } from '../../state/user';
import { z } from 'zod';
import { closeModal } from '../../state/modal';

const schema = z.object({
  amount: z.coerce.number().min(1),
});

function Service() {
  const service = useUnit($service);
  const wallets = useUnit($walletList);
  const user = useUnit($user);

  const [wallet, setWallets] = useState(wallets[0]?.id ?? '');

  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();
  const { fields, replace } = useFieldArray<FieldValues, string, keyof Input>({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'service', // unique name for your Field Array
    rules: {
      validate: (_, data) => {
        if (+data.amount < 1) {
          return 'aboba';
        }

        return true;
      },
    },
  });

  useEffect(() => {
    if (service?.body) {
      replace(JSON.parse(service.body) as Input[]);
    }
  }, [replace, service?.body]);

  function closeHandler() {
    setService(null);
  }

  async function submit(data: unknown) {
    const d = schema.parse(data);

    await createPaymentFx({
      ...d,
      walletId: wallet,
      dateTime: new Date().toISOString(),
      serviceId: service!.id,
      userId: user!.id,
    });
    reset();
    closeModal();
  }

  if (!service) return null;

  return (
    <div className={styles.container}>
      <CloseIcon className={styles.closeIcon} onClick={closeHandler} />
      <Stack spacing={2} className={styles.stack}>
        <Typography variant="h4" component="div">
          {service?.title}
        </Typography>
        <Typography variant="subtitle2" component="div">
          {service?.description}
        </Typography>
        <form className={styles.formContainer} onSubmit={handleSubmit(submit)}>
          <div>
            {fields.map((f, index) => (
              <TextField
                key={f.name}
                {...register(f.name)}
                autoFocus={index === 1}
                margin="dense"
                label={f.label}
                fullWidth
                type={f.type ?? 'text'}
                variant="standard"
                error={!!errors[f.name]?.message}
                helperText={errors[f.name]?.message as never}
              />
            ))}
            <SelectDropdown
              name="Кошелек"
              items={wallets.map((c) => ({ value: c.id, label: c.title }))}
              value={wallet}
              setValue={setWallets}
            />
            <TextField
              {...register('amount')}
              margin="dense"
              label="Сумма"
              fullWidth
              type="number"
              variant="standard"
              error={!!errors['amount']?.message}
              helperText={errors['amount']?.message as never}
            />
          </div>
          <Button type="submit" className={styles.submit}>
            Продолжить
          </Button>
        </form>
      </Stack>
    </div>
  );
}

export default Service;
