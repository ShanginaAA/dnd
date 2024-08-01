import { Box, Button, Typography } from '@mui/material';
import React, { DragEventHandler, FC, useCallback } from 'react';
import Head from './Head';

import QuestionsList from '../questions/QuestionsList';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { selectItems } from './slice';
import { Draggable, Droppable } from '@hello-pangea/dnd';

const QuestionsPage: FC = () => {
  const pages = useAppSelector(selectItems);

  return (
    <Droppable droppableId={`pages`} type="droppableItem">
      {(provided) => (
        <div ref={provided.innerRef}>
          {pages.map((item, index) => (
            <Draggable key={item.id} draggableId={`page-list-${item.id}`} index={index}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.draggableProps}>
                  <Box
                    key={item.id}
                    sx={{
                      mb: 3,
                      border: '1px solid #D9D9D9',
                      backgroundColor: '#fff',
                    }}>
                    <Head id={item.id} provided={provided} />
                    <QuestionsList page_id={item.id} />
                  </Box>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
export default QuestionsPage;
