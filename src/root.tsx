import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { AppProvider } from '@/components/AppProvider';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <AppProvider />
  </StrictMode>,
);
