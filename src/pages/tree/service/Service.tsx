import { Typography, Stack, Button } from '@mui/material';
import { FormBuilder } from '../../../utils/form-builder/FormBuilder';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import styles from './service.module.css';
import { useStore } from 'effector-react';
import { $service, setService } from '../../../state/service';
import CloseIcon from '@mui/icons-material/Close';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

function Service() {
  const service = useStore($service);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });

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
        <div className={styles.formContainer}>
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
            ]}
            register={register}
            errors={errors}
          />
        </div>

        <Button type="submit">continue</Button>
      </Stack>
    </div>
  );
}

export default Service;
