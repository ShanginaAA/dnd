'use client';

import { Box, Typography, Grid } from '@mui/material';
import { FC, Fragment } from 'react';
import { useAppSelector } from '~/hooks/useAppSelector';
import { selectQuestionTypeItems } from './slice';
import { Droppable, Draggable } from '@hello-pangea/dnd';

const Sidebar: FC = () => {
  console.log('Sidebar');
  const typeQuestions = useAppSelector(selectQuestionTypeItems);
  return (
    <Box sx={{ position: 'relative', fontSize: 14, width: '230px', mr: '16px' }}>
      <Droppable droppableId="types" isDropDisabled={true} type={`droppableSubItem`}>
        {(provided, snapshot) => (
          <div ref={provided.innerRef}>
            {typeQuestions.map((item, index) => (
              <Draggable key={item.id} draggableId={`type-${item.id}`} index={+item.id}>
                {(provided, snapshot) => (
                  <Fragment>
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        transform: snapshot.isDragging
                          ? provided.draggableProps.style?.transform
                          : 'translate(0px, 0px)',
                      }}>
                      <Box
                        sx={{
                          display: 'flex',
                          gap: '10px',
                          alignItems: 'center',
                          height: 50,
                          justifyContent: 'center',
                          border: '1px solid rgba(190,190,190,0.2)',
                          mb: 1,
                          cursor: 'pointer',
                          '&:hover': {
                            borderColor: 'rgba(190,190,190,1)',
                            backgroundColor: '#fff',
                            boxShadow: '0 4px 4px rgb(0,0,0,0.25)',
                          },
                        }}>
                        <Typography
                          component="span"
                          sx={{ fontSize: '14px', p: 1, lineHeight: 1.2 }}>
                          {item.name}
                        </Typography>
                      </Box>
                    </div>

                    {snapshot.isDragging && (
                      <Box
                        sx={{
                          transform: 'none !important',
                          display: 'flex',
                          gap: '10px',
                          alignItems: 'center',
                          height: 50,
                          justifyContent: 'center',
                          border: '1px solid rgba(190,190,190,0.2)',
                          mb: 1,
                          cursor: 'pointer',
                          borderColor: 'rgba(190,190,190,1)',
                          backgroundColor: '#fff',
                          boxShadow: '0 4px 4px rgb(0,0,0,0.25)',
                        }}>
                        <Typography
                          component="span"
                          sx={{ fontSize: '14px', p: 1, lineHeight: 1.2 }}>
                          {item.name}
                        </Typography>
                      </Box>
                    )}
                  </Fragment>
                )}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
    </Box>
  );
};
export default Sidebar;
