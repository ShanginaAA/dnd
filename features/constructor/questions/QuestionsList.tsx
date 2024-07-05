import { Box, Typography } from '@mui/material';
import React, { DragEventHandler, FC, useCallback } from 'react';
import QuestionItem from './QuestionItem';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { selectItems } from './slice';
import { selectQuestionIdsById } from '../pages/slice';

type QuestionsListParams = {
  id: number;
};

const QuestionsList: FC<QuestionsListParams> = ({ id }) => {
  const questionIds = useAppSelector((state) => selectQuestionIdsById(state, id));
  const questions = useAppSelector(selectItems);

  const onDragOver = useCallback<DragEventHandler<HTMLDivElement>>((event) => {
    event.preventDefault();
  }, []);

  const onDrop = useCallback<DragEventHandler<HTMLDivElement>>((event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData('text/html');

    // const parsed = new DOMParser().parseFromString(data, 'text/html');
    // const { body } = parsed;
    // const result = body.childNodes;

    const selection = document.getSelection() || window.getSelection();
    // const range = document.caretRangeFromPoint(event.clientX, event.clientY)!;

    console.log(selection);
  }, []);

  return (
    <Box
      sx={{ position: 'relative', pb: '93px', backgroundColor: 'rgba(0,0,0,.02)' }}
      onDragOver={onDragOver}
      onDrop={onDrop}>
      <Droppable key={id} droppableId={`${id}`}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {typeof questionIds !== 'undefined' ? (
              questionIds.map((item, index) =>
                questions
                  .filter((obj) => obj.id === `${item}`)
                  .map((obj) => (
                    <Draggable key={obj.id} draggableId={`${obj.id}`} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}>
                          <QuestionItem name={obj.name} type={obj.type} />
                        </div>
                      )}
                    </Draggable>
                  )),
              )
            ) : (
              <></>
            )}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Box>
  );
};

export default QuestionsList;
