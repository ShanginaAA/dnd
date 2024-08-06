import { RootState } from '@/app/store';

export const selectItems = (state: RootState) => {
  return state.formPages.items;
};

export const selectItemById = (state: RootState, id: number) => {
  return state.formPages.items.find((obj) => obj.id === id);
};

export const selectQuestionIdsById = (state: RootState, id: number) => {
  return state.formPages.items.find((obj) => obj.id === id)!.questionIds;
};

export const selectTotal = (state: RootState) => {
  return state.formPages.total;
};

export const selectPage = (state: RootState) => {
  return state.formPages;
};

export const selectLastPage = (state: RootState) => {
  return state.formPages.items.slice(-1)[0];
};
