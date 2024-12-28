import { ApiProvider } from '@reduxjs/toolkit/query/react';

import { api } from '@/api';
import { App } from '@/components/App';

export function AppProvider() {
  return (
    <ApiProvider api={api}>
      <App />
    </ApiProvider>
  );
}
