import { Box, Button, Typography } from '@mui/material';
import { FC, Fragment, useCallback, MouseEvent } from 'react';
import Head from './Head';

import QuestionsList from '../questions/QuestionsList';
import { useAppSelector } from '~/hooks/useAppSelector';
import { addPage, selectItems } from './slice';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import { isUndefined } from 'lodash';
import { PlaceholderProps } from '~/types/pages.type';
import { useAppDispatch } from '~/hooks/useAppDispatch';

type QuestionsPageProps = {
  placeholderProps: PlaceholderProps | undefined;
};

const QuestionsPage: FC<QuestionsPageProps> = ({ placeholderProps }) => {
  const dispatch = useAppDispatch();
  const pages = useAppSelector(selectItems);
  const lastPage = pages.slice(-1)[0];

  const onClickAddPage = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault;

    dispatch(addPage({ id: lastPage.id + 1, page: lastPage.page + 1, questionIds: [] }));
  }, []);

  return (
    <Fragment>
      <Droppable droppableId={`pages`} type="droppableItem">
        {(provided, snapshot) => (
          <div ref={provided.innerRef}>
            {pages.map((item, index) => (
              <Draggable key={item.id} draggableId={`page-list-${item.id}`} index={index}>
                {(provided, snapshot) => (
                  <div
                    id={`page-list-${item.id}`}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    style={{
                      ...provided.draggableProps.style,
                      marginBottom: 32,
                      transition: 'opacity 1s',
                    }}>
                    <Box
                      key={item.id}
                      sx={{
                        border: '1px solid #D9D9D9',
                        backgroundColor: '#fff',
                        opacity: snapshot.isDragging ? '0.3' : '1',
                      }}>
                      <Head id={item.id} index={index + 1} provided={provided} />
                      <QuestionsList page_id={item.id} />
                    </Box>
                  </div>
                )}
              </Draggable>
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
    </Fragment>
  );
};
export default QuestionsPage;
