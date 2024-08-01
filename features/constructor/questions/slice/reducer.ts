import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchQuestions } from './actions';
import { QuestionPosition, Questions } from '../../../../types/questions.type';

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface IQuestionsSliceState {
  items: Questions[];
  // status: Status;
  // error: string | undefined;
}

const initialState: IQuestionsSliceState = {
  items: [],
  // status: Status.LOADING,
  // error: undefined,
};

export const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<Questions>) {
      state.items.push({
        id: `${state.items.length + 1}`,
        name: `Ваш первый вопрос ${state.items.length + 1}`,
        ...action.payload,
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        // state.status = Status.LOADING;
        state.items = [];
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.items = action.payload;
        // state.status = Status.SUCCESS;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        // state.status = Status.ERROR;
        state.items = [];
        // state.error = action.error.message;
      });
  },
});

export const { addItem } = questionsSlice.actions;

export default questionsSlice.reducer;
