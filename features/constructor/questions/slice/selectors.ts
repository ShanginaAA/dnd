import { RootState } from '@/app/store';

export const selectItems = (state: RootState) => {
  return state.questions.items;
};

export const selectItemsById = (state: RootState, id: number) => {
  return state.questions.items.find((obj) => obj.id === `${id}`);
};
