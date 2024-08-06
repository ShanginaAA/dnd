import { Box, Typography } from '@mui/material';
import { FC, MouseEvent } from 'react';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { removePage, selectItemById, selectTotal } from './slice';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { DraggableProvided } from '@hello-pangea/dnd';

type HeadProps = {
  id: number;
  index: number;
  provided: DraggableProvided;
};

const Head: FC<HeadProps> = ({ id, index, provided }) => {
  const dispatch = useAppDispatch();
  const total = useAppSelector(selectTotal);
  const item = useAppSelector((state) => selectItemById(state, id));

  const onClickDelPage = (e: MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    const domQuery = `page-list-${item!.id}`;
    const deleteDOM = document.getElementById(domQuery);

    if (!deleteDOM) return;

    setTimeout(() => {
      dispatch(removePage(item!.id));
    }, 1000);

    deleteDOM.style.opacity = '0';
  };

  return (
    <Box
      {...provided.dragHandleProps}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '45px',
        cursor: 'move',
      }}>
      <Box
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
        {total === 1 ? `Страница ${index}` : `Страница ${index} из ${total}`}
      </Typography>

      <Box
        component="img"
        src={'/elements/trash-can.png'}
        draggable="false"
        sx={{
          height: 16,
          mr: 2,
          cursor: 'pointer',
          ...(total === 1 && { visibility: 'hidden' }),
        }}
        onClick={onClickDelPage}
      />
    </Box>
  );
};

export default Head;
