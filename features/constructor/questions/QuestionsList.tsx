import { FC, Fragment } from 'react';
import QuestionItem from './QuestionItem';
import { useAppSelector } from '~/hooks/useAppSelector';
import { selectItems } from './slice';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { FormPages, PlaceholderProps } from '~/types/pages.type';
import { Box } from '@mui/material';
import EmptyPage from './EmptyPage';
import { isUndefined } from 'lodash';

type QuestionsListParams = {
  item: FormPages;
  placeholderProps: PlaceholderProps | undefined;
};

const QuestionsList: FC<QuestionsListParams> = ({ item, placeholderProps }) => {
  const questions = useAppSelector(selectItems);

  return (
    <Droppable droppableId={`page-${item.id}`} type={`droppableSubItem`}>
      {(provided, snapshot) =>
        item.questionIds.length > 0 ? (
          <div
            ref={provided.innerRef}
            style={{
              backgroundColor: 'rgba(0,0,0,.02)',
            }}>
            <Box
              data-id={`questions-page-${item.id}`}
              sx={{
                position: 'relative',
                pb: '93px',
              }}>
              {item.questionIds.map((item, index) =>
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
                            height: 93,
                            paddingLeft: 44,
                            textAlign: 'left',
                            backgroundColor: '#fff',
                            borderBottom: '1px solid #D9D9D9',
                            opacity: snapshot.isDragging ? '0.3' : '1',
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
              )}
              {provided.placeholder && (
                <div
                  style={{
                    height: snapshot.isDraggingOver ? 93 : 0,
                  }}>
                  {provided.placeholder}
                </div>
              )}

              {snapshot.isDraggingOver &&
                !isUndefined(placeholderProps) &&
                placeholderProps.destination == `page-${item.id}` && (
                  <Box
                    sx={{
                      position: 'absolute',
                      backgroundColor: 'rgba(0,0,0,.03)',
                      top: placeholderProps.clientY,
                      left: placeholderProps.clientX,
                      height: placeholderProps.clientHeight,
                      width: placeholderProps.clientWidth,
                    }}
                  />
                )}
            </Box>
          </div>
        ) : (
          <div ref={provided.innerRef}>
            <EmptyPage snapshot={snapshot} page={item.page} />
          </div>
        )
      }
    </Droppable>
  );
};

export default QuestionsList;
