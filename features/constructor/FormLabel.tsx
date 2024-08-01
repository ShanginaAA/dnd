import { Box, Typography } from '@mui/material';
import { FC } from 'react';

const FormLabel: FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}>
      <Typography variant="h5" gutterBottom sx={{ width: '230px', textAlign: 'start', mr: 2 }}>
        Наименование
      </Typography>
      <Box>
        <Typography variant="h5" gutterBottom>
          Наименование формы
        </Typography>
      </Box>
    </Box>
  );
};

export default FormLabel;
