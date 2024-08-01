import { RootState } from '@/app/store';

export const selectQuestionTypeItems = (state: RootState) => {
  return state.questionType.items;
};

export const selectItemById = (state: RootState, id: string) => {
  return state.questionType.items.find((obj) => obj.id === id);
};
