import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { AppProvider } from '@/components/AppProvider';
import { dev } from '@/utils/env';

const root = createRoot(document.getElementById('root') as HTMLElement);

async function enableMocking() {
  if (!dev) return;

  const workerStartOptions = {
    serviceWorker: {
      onUnhandledRequest: 'error',
      url: '/repos/mockServiceWorker.js',
    },
  };

  const { worker } = await import('./api/worker');
  return worker.start(workerStartOptions);
}

enableMocking().then(() => {
  root.render(
    <StrictMode>
      <AppProvider />
    </StrictMode>,
  );
});
