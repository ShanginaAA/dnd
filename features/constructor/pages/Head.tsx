import { Box, Typography } from '@mui/material';
import { FC, MouseEvent } from 'react';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { selectItemById, selectTotal } from './slice';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { DraggableProvided } from '@hello-pangea/dnd';

type HeadProps = {
  id: number;
  provided: DraggableProvided;
};

const Head: FC<HeadProps> = ({ id, provided }) => {
  const dispatch = useAppDispatch();
  const total = useAppSelector(selectTotal);
  const item = useAppSelector((state) => selectItemById(state, id));

  const onClickDelPage = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(item?.id);
    // dispatch();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '45px',
        cursor: 'move',
      }}>
      <Box
        {...provided.dragHandleProps}
        component="img"
        src={'/elements/up-down-left-right.png'}
        draggable="false"
        sx={{ height: 16, ml: 1, mr: 2 }}
      />
      <Typography
        sx={{
          fontSize: '14px',
          textAlign: 'start',
          color: '#A0A0A0',
          flex: 1,
        }}>
        {total === 1 ? `Страница ${item?.page}` : `Страница ${item?.page} из ${total}`}
      </Typography>

      <Box
        component="img"
        src={'/elements/trash-can.png'}
        draggable="false"
        sx={{ height: 16, mr: 2, cursor: 'pointer' }}
      />
    </Box>
  );
};

export default Head;
