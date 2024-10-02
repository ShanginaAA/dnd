import { FC, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Sidebar from './sidebar/Sidebar';
import { DragDropContext, DragStart, DragUpdate, DropResult } from '@hello-pangea/dnd';
import { useAppSelector } from '~/hooks/useAppSelector';
import { selectQuestionTypeItems } from './sidebar/slice';
import { useAppDispatch } from '~/hooks/useAppDispatch';
import { addItem, selectItems } from './questions/slice';
import {
  addQuestionId,
  moveQuestion,
  removePage,
  reorderPage,
  reorderQuestionIds,
  selectTotal,
} from './pages/slice';
import { PlaceholderProps } from '~/types/pages.type';
import PanelPages from './pages/PanelPages';

const FormContent: FC = () => {
  const dispatch = useAppDispatch();
  const typeQuestions = useAppSelector(selectQuestionTypeItems);
  const questions = useAppSelector(selectItems);

  const [placeholderProps, setPlaceholderProps] = useState<PlaceholderProps>();

  const draggableAttr = 'data-rfd-draggable-id=';
  const droppableQuestionsAttr = 'data-id=questions-';

  const getDom = (key: string, value: string) => {
    const domQuery = `[${key}${value}]`;
    const draggedDOM = document.querySelector(domQuery);
    return draggedDOM;
  };

  const onDragStart = (start: DragStart) => {
    const { draggableId, source } = start;

    const draggedDOM = getDom(draggableAttr, draggableId);

    if (!draggedDOM) return;

    const { clientHeight, clientWidth } = draggedDOM;
    const sourceIndex = source.index;

    if (!draggedDOM.parentElement) return;

    const elem = draggedDOM.parentElement;
    const rect = elem.getBoundingClientRect();

    const culcOffset = [...elem.children].slice(0, sourceIndex).reduce((total, curr) => {
      const style = window.getComputedStyle(curr);
      const marginBottom = parseFloat(style.marginBottom);
      return total + curr.clientHeight + marginBottom;
    }, 0);

    const clientX = draggableId.includes('page-') ? rect.left : 0;
    const clientY = draggableId.includes('page-')
      ? rect.top + window.scrollY + culcOffset
      : culcOffset;

    setPlaceholderProps({
      destination: source.droppableId,
      clientHeight,
      clientWidth,
      clientY: clientY,
      clientX: clientX,
    });
  };

  const onDragUpdate = (update: DragUpdate) => {
    const { destination, source, draggableId } = update;

    if (!destination) return;

    const draggedDOM = getDom(draggableAttr, draggableId);
    const droppedDOM =
      draggableId.includes('type') || source.droppableId !== destination.droppableId
        ? getDom(droppableQuestionsAttr, destination.droppableId)
        : null;

    if (!draggedDOM) return;

    const { clientHeight, clientWidth } = draggedDOM;
    const destinationIndex = destination.index;
    const sourceIndex = source.index;

    if (!draggedDOM.parentElement) return;
    const elem = !droppedDOM ? draggedDOM.parentElement : droppedDOM;

    const childrenArray = [...elem.children];
    const movedItem = childrenArray[sourceIndex];
    childrenArray.splice(sourceIndex, 1);

    const updatedArray = [
      ...childrenArray.slice(0, destinationIndex),
      movedItem,
      ...childrenArray.slice(destinationIndex + 1),
    ];

    const rect = !droppedDOM ? elem.getBoundingClientRect() : draggedDOM.getBoundingClientRect();

    const culcOffset = updatedArray.slice(0, destinationIndex).reduce((total, curr) => {
      const style = window.getComputedStyle(curr);
      const marginBottom = parseFloat(style.marginBottom);
      return total + curr.clientHeight + marginBottom;
    }, 0);

    const clientH = !draggableId.includes('type-') ? clientHeight : 93;
    const clientW = !draggableId.includes('type-') ? clientWidth : 702;

    const clientX = draggableId.includes('page-') ? rect.left : 0;
    const clientY = draggableId.includes('page-')
      ? rect.top + window.scrollY + culcOffset
      : culcOffset;

    setPlaceholderProps({
      destination: destination.droppableId,
      clientHeight: clientH,
      clientWidth: clientW,
      clientY: clientY,
      clientX: clientX,
    });
  };

  const onDragEnd = (result: DropResult) => {
    setPlaceholderProps(undefined);
    const { source, destination, draggableId } = result;

    if (!destination) return;

    const destinationPageId = +destination.droppableId.split('-')[1];
    const sourcePageId = +source.droppableId.split('-')[1];

    switch (source.droppableId) {
      case 'pages': // если перетаскивают страницу
        dispatch(
          reorderPage({
            start_index: source.index,
            end_index: destination.index,
          }),
        );
        break;
      case destination.droppableId: //  если перетаскивают вопросы в пределах страницы
        dispatch(
          reorderQuestionIds({
            start_index: source.index,
            end_index: destination.index,
            fk_page_id: destinationPageId,
          }),
        );
        break;
      case 'types': // если перетаскивают новый вопрос на страницу
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
      default: // если вопрос перетаскивают на другую страницу
        dispatch(
          moveQuestion({
            source_page_id: sourcePageId,
            destination_page_id: destinationPageId,
            source_index: source.index,
            destination_index: destination.index,
          }),
        );

        // получаем вопросы на страницe
        const draggedDOM = getDom(draggableAttr, draggableId);
        if (!draggedDOM) return;
        if (!draggedDOM.parentElement) return;
        const questionsPage = draggedDOM.parentElement;

        // получаем все страницы
        const pagesDOM = getDom('data-id=', 'page-list');
        if (!pagesDOM) return;

        // получаем страницу для удаления
        const domQuery = `page-${sourcePageId}`;
        const deleteDOM = document.getElementById(domQuery);
        if (!deleteDOM) return;
        // индекс страницы
        const indexPage = [...pagesDOM.children].indexOf(deleteDOM);

        // если пустая страница и она является не последней
        if (
          [...questionsPage.children].length === 2 &&
          indexPage !== [...pagesDOM.children].length - 1
        ) {
          // удаляем страницу
          setTimeout(() => {
            dispatch(removePage(sourcePageId));
          }, 1000);

          deleteDOM.style.transition = 'opacity 1s';
          deleteDOM.style.opacity = '0';
        }
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

        <PanelPages placeholderProps={placeholderProps} />
      </DragDropContext>
    </Box>
  );
};

export default FormContent;
