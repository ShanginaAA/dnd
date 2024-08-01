import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchTypeQuestions } from './actions';
import { QuestionType } from '../../../../types/questions.type';

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface IQuestionTypeSliceState {
  items: QuestionType[];
  // status: Status;
  // error: string | undefined;
}

const initialState: IQuestionTypeSliceState = {
  items: [],
  // status: Status.LOADING,
  // error: undefined,
};

export const questionTypeSlice = createSlice({
  name: 'questionType',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTypeQuestions.pending, (state) => {
        // state.status = Status.LOADING;
        state.items = [];
      })
      .addCase(fetchTypeQuestions.fulfilled, (state, action) => {
        state.items = action.payload;
        // state.status = Status.SUCCESS;
      })
      .addCase(fetchTypeQuestions.rejected, (state, action) => {
        // state.status = Status.ERROR;
        state.items = [];
        // state.error = action.error.message;
      });
  },
});

export const {} = questionTypeSlice.actions;

export default questionTypeSlice.reducer;
