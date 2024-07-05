import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { QuestionType, Questions } from '../../../types/questions.type';

type QuestionProps = {
  name: string;
  type: QuestionType;
};

const QuestionItem: FC<QuestionProps> = ({ name, type }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        boxSizing: 'border-box',
        background: '#fff',
        height: '90px',
        pl: 4,
        textAlign: 'start',
        cursor: 'pointer',
        borderBottom: '1px solid #D9D9D9',
      }}>
      <Box sx={{ position: 'absolute', top: '2px', left: '50%', cursor: 'move' }}>
        <Box component="img" src={'/elements/grip-lines.png'} sx={{ height: 6, mr: 1 }} />
      </Box>
      <Typography sx={{ position: 'relative', top: '15px', fontSize: 20, mb: 1 }}>
        {name}
      </Typography>
      <Box
        sx={{ position: 'relative', top: '10px', display: 'flex', color: '#D9D9D9', fontSize: 14 }}>
        <Box component="img" src={type.icon} sx={{ height: 16, mr: 1 }} alt="icon" />
        {type.name}
      </Box>
    </Box>
  );
};

export default QuestionItem;
