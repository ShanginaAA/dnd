'use client';

import { DropResult } from '@hello-pangea/dnd';
import React from 'react';

export const useQuestionDnd = () => {
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    console.log(`destination: ${result.destination.index}`, `source: ${result.source.index}`);
    const destinationColumnId = result.destination.droppableId;

    if (destinationColumnId === result.source.droppableId) return;
  };
  return { onDragEnd };
};
