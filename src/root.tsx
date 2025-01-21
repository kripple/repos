import type { StartOptions } from 'msw/browser';
import { createRoot } from 'react-dom/client';

import { AppProvider } from '@/components/AppProvider';
import { dev } from '@/utils/env';

const root = createRoot(document.getElementById('root') as HTMLElement);

async function enableMocking() {
  if (!dev) return;

  const workerStartOptions: StartOptions = {
    onUnhandledRequest: 'error',
    serviceWorker: {
      url: './mockServiceWorker.js',
    },
  };

  const { worker } = await import('./mocks/worker');
  return worker.start(workerStartOptions);
}

enableMocking().then(() => {
  root.render(<AppProvider />);
});
