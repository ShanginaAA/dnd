import { Box, Button } from '@mui/material';
import { FC, MouseEvent } from 'react';
import { useAppSelector } from '~/hooks/useAppSelector';
import { addPage, selectItems } from './slice';
import { Droppable } from '@hello-pangea/dnd';
import { isUndefined } from 'lodash';
import { PlaceholderProps } from '~/types/pages.type';
import { useAppDispatch } from '~/hooks/useAppDispatch';
import Page from './Page';

type PanelPagesProps = {
  placeholderProps: PlaceholderProps | undefined;
};

const PanelPages: FC<PanelPagesProps> = ({ placeholderProps }) => {
  const dispatch = useAppDispatch();
  const pages = useAppSelector(selectItems);
  const lastPage = pages.slice(-1)[0];

  console.log(lastPage);
  const onClickAddPage = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault;
    const sortLastPage = [...pages].sort((a, b) => a.id - b.id).slice(-1)[0];
    dispatch(addPage({ id: sortLastPage.id + 1, page: sortLastPage.page + 1, questionIds: [] }));
  };

  return (
    <Box
      sx={{
        flex: 1,
      }}>
      <Droppable droppableId={`pages`} type="droppableItem">
        {(provided, snapshot) => (
          <div ref={provided.innerRef} data-id="page-list">
            {pages.map((item, index) => (
              <Page key={index} item={item} index={index} placeholderProps={placeholderProps} />
            ))}
            {provided.placeholder}
            {!isUndefined(placeholderProps) && snapshot.isDraggingOver && (
              <Box
                sx={{
                  position: 'absolute',
                  border: '1px solid #D9D9D9',
                  backgroundColor: 'rgba(0,0,0,.03)',
                  top: placeholderProps.clientY,
                  left: placeholderProps.clientX,
                  height: placeholderProps.clientHeight,
                  width: placeholderProps.clientWidth,
                }}
              />
            )}
          </div>
        )}
      </Droppable>
      <Button
        variant="contained"
        color="inherit"
        sx={{
          width: '100%',
          height: 56,
        }}
        onClick={onClickAddPage}
        disabled={lastPage && lastPage.questionIds.length === 0}>
        Добавить страницу
      </Button>
    </Box>
  );
};
export default PanelPages;
