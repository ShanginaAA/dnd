import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import React, { FC, MouseEvent } from 'react';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { selectItemById, selectTotal } from './slice';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch } from '../../../hooks/useAppDispatch';

type HeadProps = {
  id: number;
};

const Head: FC<HeadProps> = ({ id }) => {
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
        component="img"
        src={'/elements/up-down-left-right.png'}
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
      <Tooltip title="Удалить" placement="right-start" sx={{ display: total === 1 ? 'none' : '' }}>
        <IconButton aria-label="Удалить" onClick={onClickDelPage}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>

      {/* <Box
        component="img"
        src={'/elements/trash-can.png'}
        sx={{ height: 16, mr: 2, cursor: 'pointer' }}
      /> */}
    </Box>
  );
};

export default Head;
