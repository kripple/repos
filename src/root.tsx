import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { AppProvider } from '@/components/AppProvider';

const root = createRoot(document.getElementById('root') as HTMLElement);

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const workerStartOptions = {
    serviceWorker: {
      onUnhandledRequest: 'error',
      url: '/repos/mockServiceWorker.js',
    },
  };

  const { worker } = await import('./scripts/msw');
  return worker.start(workerStartOptions);
}

enableMocking().then(() => {
  root.render(
    <StrictMode>
      <AppProvider />
    </StrictMode>,
  );
});
