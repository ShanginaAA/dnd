import { Box } from '@mui/material';
import React from 'react';

const EmptyPage = () => {
  return (
    <Box sx={{ height: '126px', padding: '24px 32px 32px' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxSizing: 'border-box',
          height: '100%',
          color: '#A0A0A0',
          border: 'dashed 2px #D9D9D9',
          borderRadius: '6px',
        }}>
        Добавьте сюда вопросы формы
      </Box>
    </Box>
  );
};

export default EmptyPage;
