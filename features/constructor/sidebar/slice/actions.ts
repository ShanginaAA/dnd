import { createAsyncThunk } from '@reduxjs/toolkit';

// import { axiosClient } from '@/app/api/axios';

import { TYPE } from '../../../../data/questionsType';
import { QuestionType } from '../../../../types/questions.type';

export const fetchTypeQuestions = createAsyncThunk<QuestionType[]>(
  'questions/fetchTypeQuestions',
  async (_, { rejectWithValue }) => {
    return TYPE;
    // return await axiosClient
    //   .post('/api/questions/list', { report_id })
    //   .then((response) => response.data)
    //   .catch((error) => rejectWithValue(error.response.data));
  },
);
