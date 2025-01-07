import { setupWorker } from 'msw/browser';

import { handlers } from '@/scripts/handlers';

export const worker = setupWorker(...handlers);
