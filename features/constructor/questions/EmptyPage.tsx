import { DroppableStateSnapshot } from '@hello-pangea/dnd';
import { Box } from '@mui/material';
import { FC } from 'react';

type EmptyPageProps = {
  snapshot: DroppableStateSnapshot;
  page: number;
};
const EmptyPage: FC<EmptyPageProps> = ({ snapshot, page }) => {
  return (
    <Box sx={{ height: '73px', padding: '24px 32px 32px' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxSizing: 'border-box',
          height: '100%',
          color: '#A0A0A0',
          border: 'dashed 2px #D9D9D9',
          borderRadius: '6px',
          ...(snapshot.isDraggingOver && {
            color: 'rgba(0,0,0,.7)',
            borderColor: 'rgba(0,0,0,.5)',
            backgroundColor: 'rgba(0,0,0,.03)',
          }),
        }}>
        Добавьте сюда вопросы формы
      </Box>
    </Box>
  );
};

export default EmptyPage;
