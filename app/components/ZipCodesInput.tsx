import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import { FormControl } from '@mui/material';

interface ZipCodesInputProps {
  setZipCodes: (zipCodes: string[]) => void;
}

const ZipCodesInput: React.FC<ZipCodesInputProps> = ({ setZipCodes }) => {
  const [zipCodes, setLocalZipCodes] = useState<string[]>([]);

  const handleChange = (event: any, value: string[]) => {
    if(zipCodes.length > 99) {
      alert("You can only enter 100 zip codes");
      return;
    }
    setLocalZipCodes(value);
    setZipCodes(value);
  };

  return (
    <FormControl sx={{ minWidth: 300, width: "100%" }}>
      <Autocomplete
      multiple
      id="zip-codes-input"
      options={[]}
      freeSolo
      value={zipCodes}
      onChange={(event, value: string[]) => {
        handleChange(event, value);
      }}
      renderTags={(value: readonly string[], getTagProps) =>
        value.map((option: string, index: number) => (
        <Chip variant="outlined" label={option} {...getTagProps({ index })} />
        ))
      }
      renderInput={(params) => (
        <TextField
        {...params}
        variant="filled"
        label="Zip Codes"
        placeholder="Enter zip codes"
        error={zipCodes.length > 0 && zipCodes.some((zip) => zip.length > 6)}
        fullWidth
        />
      )}
      />
    </FormControl>
  );
};

export default ZipCodesInput;
