'use client';

import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import store, { persistor } from '@/app/store';
import { PersistGate } from 'redux-persist/es/integration/react';

export default function Providers({ children }: PropsWithChildren) {
  return (
    <Provider store={store}>
      <PersistGate loading={<>Загрузка...</>} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
