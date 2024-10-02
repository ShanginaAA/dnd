import { RootState } from '@/app/store';

// все страницы
export const selectItems = (state: RootState) => {
  return state.formPages.items;
};

// информация по запрашиваемой странице
export const selectItemById = (state: RootState, id: number) => {
  return state.formPages.items.find((obj) => obj.id === id)!;
};

// список id вопросов на запрашиваемой странице
export const selectQuestionIdsById = (state: RootState, id: number) => {
  return state.formPages.items.find((obj) => obj.id === id)!.questionIds;
};

// количество страниц
export const selectTotal = (state: RootState) => {
  return state.formPages.total;
};

// последняя страница
export const selectLastPage = (state: RootState) => {
  return state.formPages.items.slice(-1)[0];
};

export const selectEmptyPage = (state: RootState) => {
  return state.formPages.items.find((obj) => obj.questionIds.length === 0);
};
