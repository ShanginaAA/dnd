import { Box } from '@mui/material';
import { FC } from 'react';
import QuestionItem from './QuestionItem';
import { useAppSelector } from '~/hooks/useAppSelector';
import { selectItems } from './slice';
import { selectQuestionIdsById } from '../pages/slice';
import EmptyPage from './EmptyPage';
import { Draggable, Droppable } from '@hello-pangea/dnd';

type QuestionsListParams = {
  page_id: number;
};

const QuestionsList: FC<QuestionsListParams> = ({ page_id }) => {
  const questionIds = useAppSelector((state) => selectQuestionIdsById(state, page_id));
  const questions = useAppSelector(selectItems);

  return (
    <Droppable droppableId={`page-${page_id}`} type={`droppableSubItem`}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} style={{ backgroundColor: 'rgba(0,0,0,.02)' }}>
          <Box
            sx={{
              position: 'relative',
              pb: 0,
              ...(questionIds.length > 0 && { pb: '93px' }),
            }}>
            {questionIds.length > 0 ? (
              questionIds.map((item, index) =>
                questions
                  .filter((obj) => obj.id === `${item}`)
                  .map((obj) => (
                    <Draggable key={obj.id} draggableId={`question-${obj.id}`} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          style={{
                            ...provided.draggableProps.style,
                            borderBottom: '1px solid #D9D9D9',
                            height: 108,
                          }}>
                          <QuestionItem
                            key={index}
                            name={obj.name!}
                            type={obj.type}
                            provided={provided}
                          />
                        </div>
                      )}
                    </Draggable>
                  )),
              )
            ) : (
              <EmptyPage />
            )}
          </Box>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default QuestionsList;
