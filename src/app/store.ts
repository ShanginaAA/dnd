import { combineReducers, configureStore } from '@reduxjs/toolkit';
// const { createStateSyncMiddleware, initMessageListener } = require('redux-state-sync');
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  getStoredState,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { questionsSlice } from '../../features/constructor/questions/slice';
import { pagesSlice } from '../../features/constructor/pages/slice';
import { questionTypeSlice } from '../../features/constructor/sidebar/slice';

const persistConfig = {
  key: 'root',
  storage,
};

const rootRedusers = combineReducers({
  [questionsSlice.name]: questionsSlice.reducer,
  [pagesSlice.name]: pagesSlice.reducer,
  [questionTypeSlice.name]: questionTypeSlice.reducer,
});

const store = configureStore({
  reducer: persistReducer(persistConfig, rootRedusers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: true,
});

export const persistor = persistStore(store);

export default store;

export type RootState = ReturnType<typeof rootRedusers>;
export type AppDispatch = typeof store.dispatch;
