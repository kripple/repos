import { HttpResponse, delay, http, passthrough } from 'msw';

import { ErrorResponse } from '@/api/errorResponse';
import { imageData } from '@/data/avatar';
import { isPage, pages } from '@/data/pages';
import { profile } from '@/data/profile';
import { isRepo, repos } from '@/data/repos';
import { toArrayBuffer } from '@/utils/toArrayBuffer';

const enable: { [key: string]: boolean } = {
  // rateLimit: true,
  // infiniteLoading: true,
  // passthrough: true,
};

const passthroughHandler = http.all('*', () => {
  console.log('[MSW] Passthrough enabled.');
  return passthrough();
});

export const handlers = (() => {
  const items = [
    http.all('*', async () => {
      await delay(enable.infiniteLoading ? 'infinite' : 'real');
    }),

    http.get('https://api.github.com/users/:username', () => {
      return enable.rateLimit
        ? ErrorResponse.RateLimit()
        : HttpResponse.json(profile);
    }),

    http.get('https://api.github.com/users/:username/repos', ({ request }) => {
      if (enable.rateLimit) return ErrorResponse.RateLimit();

      const url = new URL(request.url); // search params
      const page = url.searchParams.get('page');
      if (!isPage(page)) return ErrorResponse.NotFound();

      return HttpResponse.json(pages[page]);
    }),

    http.get('https://avatars.githubusercontent.com/u/11916341', () => {
      if (enable.rateLimit) return ErrorResponse.RateLimit();
      return HttpResponse.arrayBuffer(toArrayBuffer(imageData));
    }),

    http.get('https://api.github.com/repos/:username/:name', ({ params }) => {
      if (enable.rateLimit) return ErrorResponse.RateLimit();

      const name = params.name; // path params
      if (!isRepo(name)) return ErrorResponse.NotFound();

      return HttpResponse.json(repos[name]);
    }),
  ];
  if (enable.passthrough) {
    items.unshift(passthroughHandler);
  }
  return items;
})();
