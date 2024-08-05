import { Box, Button, Typography } from '@mui/material';
import { FC, Fragment } from 'react';
import Head from './Head';

import QuestionsList from '../questions/QuestionsList';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { selectItems } from './slice';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import { isUndefined } from 'lodash';
import { PlaceholderProps } from '~/types/pages.type';

type QuestionsPageProps = {
  placeholderProps: PlaceholderProps | undefined;
};

const QuestionsPage: FC<QuestionsPageProps> = ({ placeholderProps }) => {
  const pages = useAppSelector(selectItems);

  return (
    <Droppable droppableId={`pages`} type="droppableItem">
      {(provided, snapshot) => (
        <div ref={provided.innerRef}>
          {pages.map((item, index) => (
            <Draggable key={item.id} draggableId={`page-list-${item.id}`} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  style={{ ...provided.draggableProps.style, marginBottom: 32 }}>
                  <Box
                    key={item.id}
                    sx={{
                      border: '1px solid #D9D9D9',
                      backgroundColor: '#fff',
                      opacity: snapshot.isDragging ? '0.3' : '1',
                    }}>
                    <Head id={item.id} provided={provided} />
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
  );
};
export default QuestionsPage;
