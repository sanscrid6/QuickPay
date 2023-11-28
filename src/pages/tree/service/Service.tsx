import { Typography, Stack, Button } from '@mui/material';
import { FormBuilder } from '../../../utils/form-builder/FormBuilder';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import styles from './service.module.css';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

function Service() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });

  return (
    <Stack spacing={2}>
      <Typography variant="h2" component="div">
        title
      </Typography>
      <Typography variant="subtitle2" component="div">
        description
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
  );
}

export default Service;
