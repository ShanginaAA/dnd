'use client';

import { Box, Typography, Grid } from '@mui/material';
import React, { DragEventHandler, FC, useCallback, useEffect, useRef } from 'react';
import { TYPE } from '../../../data/questionsType';
import QuestionType from './QuestionType';

const Sidebar: FC = () => {
  return (
    <Box sx={{ position: 'relative', fontSize: 14, width: '230px', mr: '16px' }}>
      {TYPE.map((item, index) => (
        <QuestionType key={index} id={item.id} name={item.name} />
      ))}
    </Box>
  );
};
export default Sidebar;
