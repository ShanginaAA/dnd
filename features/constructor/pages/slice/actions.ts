import { createAsyncThunk } from '@reduxjs/toolkit';

// import { axiosClient } from '@/app/api/axios';

import { FormPages } from '../../../../types/pages.type';
import { PAGES } from '../../../../data/pages';

export const fetchPages = createAsyncThunk<FormPages[]>(
  'pages/fetchFormPages',
  async (_, { rejectWithValue }) => {
    return PAGES;
    // return await axiosClient
    //   .post('/api/questions/list', { report_id })
    //   .then((response) => response.data)
    //   .catch((error) => rejectWithValue(error.response.data));
  },
);
