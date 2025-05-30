import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      minWidth: "400px",
    },
  },
};

type MultipleSelectProps = {
  label: string;
  values: string[];
  onChange?: (value: string[]) => void;
};


function getStyles(name: string, valueName: readonly string[], theme: Theme) {
  return {
    fontWeight: valueName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

export default function MultipleSelectChip({ label, values, onChange }: MultipleSelectProps) {
  const theme = useTheme();
  const [valueNames, setValueNames] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof valueNames>) => {
    const {
      target: { value },
    } = event;
    // On autofill we get a stringified value.
    const splitNames = typeof value === 'string' ? value.split(',') : value;

    setValueNames(splitNames);
    onChange?.(splitNames);
  };

  const onChangeRef = React.useRef(onChange);

  React.useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  React.useEffect(() => {
    setValueNames([]);
    onChangeRef.current?.([]);
  }, [values]);

  return (
    <div>
      <FormControl sx={{ minWidth: 300, width: "100%" }}>
        <InputLabel id="multiple-chip-label">{label}</InputLabel>
        <Select
          labelId="multiple-chip-label"
          multiple
          value={valueNames}
          onChange={handleChange}
          sx={{ width: "100%" }}
          input={
            <OutlinedInput
              id="select-multiple-chip"
              label={label}
            />
          }
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}

        >
          {values.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, valueNames, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
