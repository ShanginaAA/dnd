import { FC, useState } from 'react';
import { Box } from '@mui/material';
import Sidebar from './sidebar/Sidebar';
import QuestionsPage from './pages/QuestionsPage';
import { DragDropContext, DragStart, DragUpdate, DropResult } from '@hello-pangea/dnd';
import { useAppSelector } from '~/hooks/useAppSelector';
import { selectQuestionTypeItems } from './sidebar/slice';
import { useAppDispatch } from '~/hooks/useAppDispatch';
import { addItem, selectItems } from './questions/slice';
import {
  addQuestionId,
  moveQuestion,
  reorderPage,
  reorderQuestionIds,
  selectQuestionIdsById,
} from './pages/slice';
import { PlaceholderProps } from '~/types/pages.type';

const FormContent: FC = () => {
  const dispatch = useAppDispatch();
  const typeQuestions = useAppSelector(selectQuestionTypeItems);
  const questions = useAppSelector(selectItems);

  const [placeholderProps, setPlaceholderProps] = useState<PlaceholderProps>();

  const getDraggedDom = (draggableId: string) => {
    const domQuery = `[data-rfd-draggable-id='${draggableId}']`;
    const draggedDOM = document.querySelector(domQuery);
    return draggedDOM;
  };

  const onDragStart = (start: DragStart) => {
    const { draggableId, source } = start;

    if (!draggableId.includes('page-list')) return;

    const draggedDOM = getDraggedDom(draggableId);

    if (!draggedDOM) return;

    const { clientHeight, clientWidth } = draggedDOM;
    const sourceIndex = source.index;

    if (!draggedDOM.parentElement) return;

    const elem = draggedDOM.parentElement;
    const rect = elem.getBoundingClientRect();

    const clientY =
      rect.top +
      window.scrollY +
      [...elem.children].slice(0, sourceIndex).reduce((total, curr) => {
        const style = window.getComputedStyle(curr);
        const marginBottom = parseFloat(style.marginBottom);
        return total + curr.clientHeight + marginBottom;
      }, 0);

    setPlaceholderProps({
      clientHeight,
      clientWidth,
      clientY: clientY,
      clientX: rect.left,
    });
  };

  const onDragUpdate = (update: DragUpdate) => {
    const { destination, source, draggableId } = update;

    if (!destination) return;

    if (!draggableId.includes('page-list')) return;

    const draggedDOM = getDraggedDom(draggableId);

    if (!draggedDOM) return;

    const { clientHeight, clientWidth } = draggedDOM;
    const destinationIndex = destination.index;
    const sourceIndex = source.index;

    if (!draggedDOM.parentElement) return;

    const elem = draggedDOM.parentElement;

    const childrenArray = [...elem.children];
    const movedItem = childrenArray[sourceIndex];
    childrenArray.splice(sourceIndex, 1);

    const updatedArray = [
      ...childrenArray.slice(0, destinationIndex),
      movedItem,
      ...childrenArray.slice(destinationIndex + 1),
    ];

    const rect = elem.getBoundingClientRect();

    const clientY =
      rect.top +
      window.scrollY +
      updatedArray.slice(0, destinationIndex).reduce((total, curr) => {
        const style = window.getComputedStyle(curr);
        const marginBottom = parseFloat(style.marginBottom);
        return total + curr.clientHeight + marginBottom;
      }, 0);

    setPlaceholderProps({
      clientHeight,
      clientWidth,
      clientY: clientY,
      clientX: rect.left,
    });
  };

  const onDragEnd = (result: DropResult) => {
    setPlaceholderProps(undefined);
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    const destinationPageId = +destination.droppableId.split('-')[1];
    const sourcePageId = +source.droppableId.split('-')[1];

    switch (source.droppableId) {
      case 'pages':
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
        const domQuery = `page-list-${sourcePageId}`;
        const deleteDOM = document.getElementById(domQuery);

        if (!deleteDOM) return;

        dispatch(
          moveQuestion({
            source_page_id: sourcePageId,
            destination_page_id: destinationPageId,
            source_index: source.index,
            destination_index: destination.index,
          }),
        );
        // нужно добавить удаление

        console.log(deleteDOM);
        // deleteDOM.style.opacity = '0';

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
      <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart} onDragUpdate={onDragUpdate}>
        <Sidebar />
        <Box
          sx={{
            flex: 1,
          }}>
          <QuestionsPage placeholderProps={placeholderProps} />
        </Box>
      </DragDropContext>
    </Box>
  );
};

export default FormContent;
