'use client';

import { Container, Box, Typography, Button } from '@mui/material';
import { useEffect } from 'react';
import Sidebar from '../../../../features/constructor/sidebar/Sidebar';
import QuestionsPage from '../../../../features/constructor/pages/QuestionsPage';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';

import { fetchPages, reorder, move } from '../../../../features/constructor/pages/slice';
import { fetchQuestions } from '../../../../features/constructor/questions/slice';

export const ConstructorPage = () => {
  const dispatch = useAppDispatch();

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    // console.log(source.droppableId);
    if (!destination) return;

    if (source.droppableId === 'questionType') {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;

    if (destination.droppableId === source.droppableId) {
      dispatch(
        reorder({
          start_index: source.index,
          end_index: destination.index,
          fk_page_id: +destination.droppableId,
        }),
      );
    } else {
      dispatch(
        move({
          source_page_id: +source.droppableId,
          destination_page_id: +destination.droppableId,
          source_index: source.index,
          destination_index: destination.index,
        }),
      );
      console.log(destination.droppableId, source.droppableId);
    }
  };

  useEffect(() => {
    dispatch(fetchPages());
    dispatch(fetchQuestions());
  }, []);
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      <Box
        sx={{
          flex: 1,
          margin: '0 auto',
          padding: '0 20px',
        }}>
        <Box
          // component={Paper}
          sx={{
            width: '950px',
            mt: 4,
            p: 3,
            // backgroundColor: '#f9f9f9',
          }}>
          {/* header */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: '69px',
            }}>
            <Typography variant="h5">Конструктор формы *Тип формы*</Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Button
                variant="outlined"
                sx={{
                  mr: 2,
                }}
                color="inherit">
                Сохранить шаблон
              </Button>
              <Button variant="outlined" color="inherit">
                Создать форму
              </Button>
            </Box>
          </Box>

          {/* label */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ width: '230px', textAlign: 'start', mr: 2 }}>
              Наименование
            </Typography>
            <Box>
              <Typography variant="h5" gutterBottom>
                Наименование формы
              </Typography>
            </Box>
          </Box>

          {/* content */}

          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              minHeight: '600px',
              mt: 1,
            }}>
            <Sidebar />
            <DragDropContext onDragEnd={onDragEnd}>
              <Box
                sx={{
                  flex: 1,
                }}>
                <QuestionsPage />
                <Button variant="contained" color="inherit" sx={{ width: '100%', height: 56 }}>
                  Добавить страницу
                </Button>
              </Box>
            </DragDropContext>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};
