import * as matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';
import { afterAll, afterEach, beforeAll, beforeEach, expect, vi } from 'vitest';

import { server } from '@/mocks/node';

// Use custom jest matchers with vitest.
import '@testing-library/jest-dom/vitest'; // <-- very important
expect.extend(matchers);

beforeAll(() => {
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});

// Replace some console methods.
beforeEach(() => {
  const filterWarningsThatInclude = [
    'ImmutableStateInvariantMiddleware',
    'SerializableStateInvariantMiddleware',
  ];

  /**
   * Disable console.error spy to view error details.
   */
  vi.spyOn(console, 'error').mockImplementation((args: any) => {
    // Fail test if unexpected errors are present.
    throw Error(args);
  });

  /**
   * Disable console.warn spy to view warning details.
   */
  vi.spyOn(console, 'warn').mockImplementation((args: any) => {
    // Filter specific warnings
    if (filterWarningsThatInclude.some((warning) => args?.includes(warning))) {
      console.info('warning detected, tests will proceed');
      return;
    } else {
      // Fail test if unexpected warnings are present.
      throw Error(args);
    }
  });
});

// Unmount and destroy components between tests.
afterEach(() => {
  cleanup();
});
