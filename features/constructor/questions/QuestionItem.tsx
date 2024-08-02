import { FC, useRef, useCallback, DragEventHandler, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { QuestionType, Questions } from '~/types/questions.type';
import { DraggableProvided } from '@hello-pangea/dnd';
import QuestionIcons from './QuestionIcons';

type QuestionProps = {
  name: string;
  type: QuestionType;
  provided: DraggableProvided;
};

const QuestionItem: FC<QuestionProps> = ({ name, type, provided }) => {
  const [isShow, setIsShow] = useState(true);

  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        {...provided.dragHandleProps}
        sx={{ position: 'absolute', top: 5, left: '50%', transform: 'translateX(-50%)' }}>
        <Box
          component="img"
          src={'/elements/grip-lines.png'}
          sx={{ ...(!isShow && { visibility: 'hidden' }), height: 6, mr: 1, cursor: 'move' }}
        />
      </Box>
      <Box sx={{ position: 'relative', top: 20, mb: 1.4 }}>
        <Typography fontSize={20}>{name}</Typography>
      </Box>
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
      <QuestionIcons isShow={isShow} />
    </Box>
  );
};

export default QuestionItem;
