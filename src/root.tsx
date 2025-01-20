import type { StartOptions } from 'msw/browser';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { AppProvider } from '@/components/AppProvider';
import { dev } from '@/utils/env';

const root = createRoot(document.getElementById('root') as HTMLElement);

async function enableMocking() {
  if (!dev) return;

  const workerStartOptions: StartOptions = {
    serviceWorker: {
      url: './mockServiceWorker.js',
    },
  };

  const { worker } = await import('./mocks/browser');
  return worker.start(workerStartOptions);
}

enableMocking().then(() => {
  root.render(
    <StrictMode>
      <AppProvider />
    </StrictMode>,
  );
});
