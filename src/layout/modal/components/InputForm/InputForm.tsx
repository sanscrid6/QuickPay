import { TextField } from '@mui/material';
import { Input } from '../../../../state/tree/types';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './input-form.module.css';
import SelectDropdown from '../../../../components/select/SelectDropdown';

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
        <SelectDropdown
          items={types}
          value={type}
          setValue={(t) => changeInput({ type: t })}
        />
      </div>

      <DeleteIcon onClick={deleteInput} className={styles.icon} />
    </div>
  );
}

export default InputForm;
