import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';

const ariaLabel = { 'aria-label': 'description' };

export default function SearchText() {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <Input placeholder="검색어 추가" inputProps={ariaLabel} />
    </Box>
  );
}