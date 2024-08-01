'use client';

import { Container, Box } from '@mui/material';
import { useEffect } from 'react';

import { useAppDispatch } from '~/hooks/useAppDispatch';
import { fetchPages } from '~/features/constructor/pages/slice';
import { fetchQuestions } from '~/features/constructor/questions/slice';
import { fetchTypeQuestions } from '~/features/constructor/sidebar/slice';
import FormHeader from '~/features/constructor/FormHeader';
import FormLabel from '~/features/constructor/FormLabel';
import FormContent from '~/features/constructor/FormContent';

export const ConstructorPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPages());
    dispatch(fetchQuestions());
    dispatch(fetchTypeQuestions());
  }, []);
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      <Box
        sx={{
          flex: 1,
          margin: '0 auto',
          padding: '0 20px',
        }}>
        <Box
          sx={{
            width: '950px',
            mt: 4,
            p: 3,
          }}>
          <FormHeader />
          <FormLabel />
          <FormContent />
        </Box>
      </Box>
    </Container>
  );
};
