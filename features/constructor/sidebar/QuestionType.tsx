import { Box, Typography } from '@mui/material';
import { DragEventHandler, FC, useCallback, useRef } from 'react';
import { QuestionType } from '../../../types/questions.type';

const QuestionType: FC<QuestionType> = ({ id, name }) => {
  const area = useRef<HTMLDivElement>(null);

  const onDragStart = useCallback<DragEventHandler<HTMLDivElement>>((event) => {
    const { dataTransfer } = event;
    dataTransfer.setData('text/html', event.currentTarget.outerHTML);
    console.log(area.current);
  }, []);
  return (
    <Box
      sx={{
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
        height: '50px',
        justifyContent: 'center',
        border: '1px solid rgba(190,190,190,0.2)',
        mb: 1,
        cursor: 'pointer',
        '&:hover': {
          borderColor: 'rgba(190,190,190,1)',
          backgroundColor: '#fff',
          boxShadow: '0 4px 4px rgb(0,0,0,0.25)',
        },
      }}
      ref={area}
      draggable={true}
      onDragStart={onDragStart}
      id={id}>
      <Typography component="span" sx={{ fontSize: '14px', p: 1, lineHeight: 1.2 }}>
        {name}
      </Typography>
    </Box>
  );
};

export default QuestionType;
