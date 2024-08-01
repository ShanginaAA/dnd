import { FC } from 'react';
import { Box, Button } from '@mui/material';
import Sidebar from './sidebar/Sidebar';
import QuestionsPage from './pages/QuestionsPage';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { useAppSelector } from '~/hooks/useAppSelector';
import { selectQuestionTypeItems } from './sidebar/slice';
import { useAppDispatch } from '~/hooks/useAppDispatch';
import { addItem, selectItems } from './questions/slice';
import { addQuestionId, moveQuestion, reorderPage, reorderQuestionIds } from './pages/slice';

const FormContent: FC = () => {
  const dispatch = useAppDispatch();
  const typeQuestions = useAppSelector(selectQuestionTypeItems);
  const questions = useAppSelector(selectItems);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    console.log(result);
    if (!destination) {
      return;
    }

    const destinationPageId = +destination.droppableId.split('-')[1];
    const sourcePageId = +source.droppableId.split('-')[1];

    switch (source.droppableId) {
      case 'pages':
        console.log('pages');
        dispatch(
          reorderPage({
            start_index: source.index,
            end_index: destination.index,
          }),
        );
        break;
      case destination.droppableId:
        dispatch(
          reorderQuestionIds({
            start_index: source.index,
            end_index: destination.index,
            fk_page_id: destinationPageId,
          }),
        );
        break;
      case 'types':
        dispatch(
          addItem({
            type: typeQuestions.find((obj) => obj.id === `${source.index}`)!,
            fk_page_id: destinationPageId,
          }),
        );
        dispatch(
          addQuestionId({
            id: destinationPageId,
            destination_index: destination.index,
            questionId: questions.length + 1,
          }),
        );
        break;
      default:
        dispatch(
          moveQuestion({
            source_page_id: sourcePageId,
            destination_page_id: destinationPageId,
            source_index: source.index,
            destination_index: destination.index,
          }),
        );
        break;
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        minHeight: '600px',
        mt: 1,
      }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Sidebar />
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
  );
};

export default FormContent;
