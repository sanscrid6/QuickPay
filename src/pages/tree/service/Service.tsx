import { Typography, Stack, Button, TextField } from '@mui/material';
import { FormBuilder } from '../../../utils/form-builder/FormBuilder';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, useFieldArray, useForm } from 'react-hook-form';
import styles from './service.module.css';
import { useStore } from 'effector-react';
import { $service, setService } from '../../../state/service';
import CloseIcon from '@mui/icons-material/Close';
import { Input } from '../../../state/tree';
import { useEffect } from 'react';

const f = [
  {
    type: 'text',
    label: 'Email',
    name: 'email',
  },
  {
    type: 'text',
    label: 'Password',
    name: 'password',
  },
];

function Service() {
  const service = useStore($service);

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
      <Stack
        spacing={2}
        style={{
          maxWidth: '80%',
        }}
      >
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
          <Button
            type="submit"
            className={styles.submit}
            style={{ marginTop: '1rem' }}
          >
            continue
          </Button>
        </form>
      </Stack>
    </div>
  );
}

export default Service;
