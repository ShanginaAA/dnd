import { Box } from '@mui/material';
import { FC } from 'react';

type QuestionIconsProps = {
  isShow: boolean;
};
const QuestionIcons: FC<QuestionIconsProps> = ({ isShow }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 40,
        right: 16,
      }}>
      <Box
        component="img"
        src={'/elements/copy.png'}
        sx={{
          ...(!isShow && { visibility: 'hidden' }),
          height: 16,
          cursor: 'pointer',
          ml: 1,
          mr: 1,
        }}
      />
      <Box
        component="img"
        src={'/elements/trash-can.png'}
        sx={{
          ...(!isShow && { visibility: 'hidden' }),
          height: 16,
          cursor: 'pointer',
          ml: 1,
          mr: 1,
        }}
      />
    </Box>
  );
};

export default QuestionIcons;
