import { TextField } from '@mui/material';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

type FormField = {
  name: string;
  label: string;
  type?: 'text' | 'email' | 'password' | 'number';
};

type FormBuilderProps<T extends Record<string, string>> = {
  fields: FormField[];
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
};

export function FormBuilder<T extends Record<string, string>>({
  register,
  errors,
  fields,
}: FormBuilderProps<T>) {
  return (
    <>
      {fields.map((f) => {
        return (
          <TextField
            key={f.name}
            {...register(f.name as never)}
            autoFocus
            margin="dense"
            label={f.label}
            fullWidth
            type={f.type ?? 'text'}
            variant="standard"
            error={!!errors[f.name]?.message}
            helperText={errors[f.name]?.message as never}
          />
        );
      })}
    </>
  );
}
