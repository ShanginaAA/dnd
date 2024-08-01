import { FC, useRef, useCallback, DragEventHandler, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { QuestionType, Questions } from '~/types/questions.type';
import { DraggableProvided } from '@hello-pangea/dnd';

type QuestionProps = {
  name: string;
  type: QuestionType;
  provided: DraggableProvided;
};

const QuestionItem: FC<QuestionProps> = ({ name, type, provided }) => {
  const [isShow, setIsShow] = useState(true);

  return (
    <Box sx={{ backgroundColor: '#fff' }}>
      <Box {...provided.dragHandleProps}>
        <Box
          component="img"
          src={'/elements/grip-lines.png'}
          sx={{ ...(!isShow && { visibility: 'hidden' }), height: 6, mr: 1, cursor: 'move' }}
        />
      </Box>
      <Box
        sx={{
          position: 'relative',
          boxSizing: 'border-box',
          height: 90,
          pl: 4,
          textAlign: 'start',
          cursor: 'pointer',
        }}>
        <Typography sx={{ position: 'relative', top: '15px', fontSize: 20, mb: 1 }}>
          {name}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            top: '10px',
            color: '#D9D9D9',
            fontSize: 14,
          }}>
          <Box component="img" src={type.icon} sx={{ height: 15, mr: 1 }} />
          {type.name}
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            position: 'absolute',
            top: 30,
            right: 16,
            bottom: 31,
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
      </Box>
    </Box>
  );
};

export default QuestionItem;
