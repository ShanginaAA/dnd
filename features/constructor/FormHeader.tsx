import { Box, Typography, Button } from '@mui/material';
import { FC } from 'react';

const FormHeader: FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '69px',
      }}>
      <Typography variant="h5">Конструктор формы *Тип формы*</Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Button
          variant="outlined"
          sx={{
            mr: 2,
          }}
          color="inherit">
          Сохранить шаблон
        </Button>
        <Button variant="outlined" color="inherit">
          Создать форму
        </Button>
      </Box>
    </Box>
  );
};

export default FormHeader;
