import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Stack,
} from '@mui/material';
import { useCallback, useState } from 'react';
import { PickDeep, ValueOf } from 'type-fest';
import DeleteIcon from '@mui/icons-material/Delete';
import { Input } from '../../../../state/tree/types';
import styles from './input.module.css';

const types = [
  {
    label: 'Текст',
    value: 'text' as const,
  },
  {
    label: 'Число',
    value: 'number' as const,
  },
  {
    label: 'Дата',
    value: 'date' as const,
  },
];

type InputType = ValueOf<PickDeep<(typeof types)[number], 'value'>>;

type InputFormProps = Input & {
  deleteInput: () => void;
  changeInput: (data: Partial<Input>) => void;
};

function InputForm({
  deleteInput,
  label,
  name,
  type,

  changeInput,
}: InputFormProps) {
  const changeTypeHandler = useCallback(
    (event: SelectChangeEvent<'number' | 'text' | 'date'>) => {
      changeInput({ type: event.target.value as InputType });
    },
    [changeInput],
  );

  return (
    <div className={styles.container}>
      <TextField
        margin="dense"
        label="Название для пользователя"
        type="text"
        value={label}
        variant="standard"
        onChange={(e) => changeInput({ label: e.target.value })}
      />
      <TextField
        margin="dense"
        label="Системное название"
        type="text"
        value={name}
        variant="standard"
        onChange={(e) => changeInput({ name: e.target.value })}
      />
      <div className={styles.select}>
        <FormControl fullWidth variant="standard">
          <InputLabel id="demo-simple-select-label">Тип поля</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            value={type}
            label="Age"
            onChange={changeTypeHandler}
          >
            {types.map(({ label, value }) => (
              <MenuItem value={value} key={value}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <DeleteIcon onClick={deleteInput} className={styles.icon} />
    </div>
  );
}

export default InputForm;
