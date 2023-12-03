import { Typography, Stack, Button, TextField } from '@mui/material';
import { FieldValues, useFieldArray, useForm } from 'react-hook-form';
import { useUnit } from 'effector-react';
import { $service, setService } from '../../../state/service/service';
import { useEffect } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import styles from './service.module.css';
import { Input } from '../../../state/tree/types';

function Service() {
  const service = useUnit($service);

  const {
    control,
    register,
    formState: { errors },
  } = useForm<FieldValues>();
  const { fields, replace } = useFieldArray<FieldValues, string, keyof Input>({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'service', // unique name for your Field Array
  });

  useEffect(() => {
    if (service?.body) {
      replace(JSON.parse(service.body) as Input[]);
    }
  }, [replace, service?.body]);

  function closeHandler() {
    setService(null);
  }

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
        <form className={styles.formContainer}>
          {fields.map((f, index) => (
            <TextField
              key={f.name}
              {...register(f.name as never)}
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
          <Button type="submit" className={styles.submit}>
            Продолжить
          </Button>
        </form>
      </Stack>
    </div>
  );
}

export default Service;
