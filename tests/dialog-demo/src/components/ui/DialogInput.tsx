import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setMessage } from '../../store/dialogSlice';

export const DialogInput: React.FC = () => {
  const [input, setInput] = useState('');
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      dispatch(setMessage(input.trim()));
      setInput('');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        gap: 2,
        p: 2,
        maxWidth: 600,
        margin: '20px auto'
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="輸入對話內容..."
        size="small"
      />
      <Button 
        variant="contained" 
        type="submit"
        disabled={!input.trim()}
      >
        發送
      </Button>
    </Box>
  );
};
