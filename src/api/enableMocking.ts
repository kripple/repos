import { dev } from '@/utils/env';

export async function enableMocking() {
  if (!dev) return;

  const workerConfig = {
    serviceWorker: {
      onUnhandledRequest: 'error',
      url: '/repos/mockServiceWorker.js',
    },
  };

  const { worker } = await import('./worker');
  return worker.start(workerConfig);
}
