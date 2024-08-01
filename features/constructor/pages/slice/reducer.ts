import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchPages } from './actions';
import { FormPages, PagePosition, QuestionIdPage } from '~/types/pages.type';
import { QuestionPage, QuestionPosition } from '~/types/questions.type';

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface IPagesSliceState {
  items: FormPages[];
  total: number;
  // status: Status;
  // error: string | undefined;
}

const initialState: IPagesSliceState = {
  items: [],
  total: 1,
  // status: Status.LOADING,
  // error: undefined,
};

export const pagesSlice = createSlice({
  name: 'formPages',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<FormPages>) {
      state.items.push({ ...action.payload });
      state.total = state.items.length;
    },
    addQuestionId(state, action: PayloadAction<QuestionIdPage>) {
      const questionIds = state.items.find((obj) => obj.id === action.payload.id)?.questionIds!;

      questionIds.splice(action.payload.destination_index, 0, action.payload.questionId);
    },
    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
    reorderPage(state, action: PayloadAction<PagePosition>) {
      // удалить 1 элемент начиная с start_index (source.index)
      const [removed] = state.items.splice(action.payload.start_index, 1);
      // с идндекса назначения (destination.index) удалить 0 элеметов и вставить removed
      state.items.splice(action.payload.end_index, 0, removed);

      // state.items.map((obj) =>
      //   obj.id === action.payload.fk_page_id ? (obj.questionIds = result) : obj,
      // );
    },
    reorderQuestionIds(state, action: PayloadAction<QuestionPosition>) {
      const result = state.items.find((obj) => obj.id === action.payload.fk_page_id)?.questionIds!;
      // удалить 1 элемент начиная с start_index (source.index)
      const [removed] = result.splice(action.payload.start_index, 1);
      // с идндекса назначения (destination.index) удалить 0 элеметов и вставить removed
      result.splice(action.payload.end_index, 0, removed);

      state.items.map((obj) =>
        obj.id === action.payload.fk_page_id ? (obj.questionIds = result) : obj,
      );
    },
    moveQuestion(state, action: PayloadAction<QuestionPage>) {
      const sourceClone = state.items.find((obj) => obj.id === action.payload.source_page_id)!;
      const destClone = state.items.find((obj) => obj.id === action.payload.destination_page_id)!;
      // удалить 1 элемент начиная с start_index (source.index) с одной страницы
      const [removed] = sourceClone.questionIds.splice(action.payload.source_index, 1);
      // с индекса назначения (destination.index) удалить 0 элеметов и вставить removed на другую страницу
      destClone!.questionIds.splice(action.payload.destination_index, 0, removed);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPages.pending, (state) => {
        // state.status = Status.LOADING;
        state.items = [];
        state.total = 1;
      })
      .addCase(fetchPages.fulfilled, (state, action) => {
        state.items = action.payload;
        state.total = action.payload.length;
        // state.status = Status.SUCCESS;
      })
      .addCase(fetchPages.rejected, (state, action) => {
        // state.status = Status.ERROR;
        state.items = [];
        state.total = 1;
        // state.error = action.error.message;
      });
  },
});

export const { addItem, addQuestionId, removeItem, reorderPage, reorderQuestionIds, moveQuestion } =
  pagesSlice.actions;

export default pagesSlice.reducer;
