import { createAsyncThunk } from '@reduxjs/toolkit';

// import { axiosClient } from '@/app/api/axios';

import { QUESTIONS } from '../../../../data/questions';
import { Questions } from '../../../../types/questions.type';

export const fetchQuestions = createAsyncThunk<Questions[]>(
  'questions/fetchQuestions',
  async (_, { rejectWithValue }) => {
    return QUESTIONS;
    // return await axiosClient
    //   .post('/api/questions/list', { report_id })
    //   .then((response) => response.data)
    //   .catch((error) => rejectWithValue(error.response.data));
  },
);
