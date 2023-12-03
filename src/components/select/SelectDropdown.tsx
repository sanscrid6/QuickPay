import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useCallback } from 'react';

type SelectDropdownProps<T extends string | number> = {
  items: { value: T; label: string }[];
  value: T;
  setValue: (v: T) => void;
  name: string;
};

function SelectDropdown<T extends string | number>({
  items,
  value,
  setValue,
  name,
}: SelectDropdownProps<T>) {
  const changeTypeHandler = useCallback(
    (event: SelectChangeEvent<'number' | 'text' | 'date'>) => {
      setValue(event.target.value as T);
    },
    [setValue],
  );

  return (
    <FormControl fullWidth variant="standard" margin="dense">
      <InputLabel id="demo-simple-select-label">{name}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        value={value as 'number' | 'text'}
        onChange={changeTypeHandler}
      >
        {items.map(({ label, value }) => (
          <MenuItem value={value} key={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SelectDropdown;
