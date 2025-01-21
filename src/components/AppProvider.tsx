import { ApiProvider } from '@reduxjs/toolkit/query/react';

import { api } from '@/api/endpoints';
import { Theme } from '@/components/Theme';

export function AppProvider() {

  return (
    <ApiProvider api={api}>
      <Theme />
    </ApiProvider>
  );
}
