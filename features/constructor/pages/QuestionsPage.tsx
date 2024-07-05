import { Box, Button, Typography } from '@mui/material';
import React, { DragEventHandler, FC, useCallback } from 'react';
import Head from './Head';

import QuestionsList from '../questions/QuestionsList';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { selectItems } from './slice';

const QuestionsPage: FC = () => {
  const pages = useAppSelector(selectItems);

  return pages.map((item) => (
    <Box
      key={item.id}
      sx={{
        mb: 3,
        border: '1px solid #D9D9D9',
        backgroundColor: '#fff',
      }}>
      <Head id={item.id} />
      <QuestionsList id={item.id} />
    </Box>
  ));
};

export default QuestionsPage;
