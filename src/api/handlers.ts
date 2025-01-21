import { HttpResponse, delay, http, passthrough } from 'msw';

import { ErrorResponse } from '@/api/errorResponse';
import { imageData } from '@/data/avatar';
import { languages } from '@/data/languages';
import { isPage, pages } from '@/data/pages';
import { profile } from '@/data/profile';
import { repos } from '@/data/repos';
import { test } from '@/utils/env';
import { toArrayBuffer } from '@/utils/toArrayBuffer';

const enabled = !test;
const enable: { [key: string]: boolean } = {
  allowUnusedVars: enabled,
  // delay: enabled,
  // infiniteLoading: enabled,
  // rateLimit: enabled,
  // passthrough: enabled,
};

const passthroughHandler = http.all('*', () => {
  return passthrough();
});

const delayHandler = http.all('*', async () => {
  await delay(enable.infiniteLoading ? 'infinite' : 'real');
});

export const handlers = (() => {
  const items = [
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

      const currentPage = pages[page];
      const itemsPerPage = url.searchParams.get('per_page') || '0';

      if (page === '1' && parseInt(itemsPerPage) > currentPage.length) {
        return HttpResponse.json(Object.values(repos));
      } else {
        return HttpResponse.json(pages[page]);
      }
    }),

    http.get('https://avatars.githubusercontent.com/u/11916341', () => {
      if (enable.rateLimit) return ErrorResponse.RateLimit();
      return HttpResponse.arrayBuffer(toArrayBuffer(imageData));
    }),

    http.get(
      'https://api.github.com/repos/:username/:repo/languages',
      () => {
        return enable.rateLimit
          ? ErrorResponse.RateLimit()
          : HttpResponse.json(languages);
      },
    ),

    // http.get('https://api.github.com/repos/:username/:name', ({ params }) => {
    //   if (enable.rateLimit) return ErrorResponse.RateLimit();

    //   const name = params.name; // path params
    //   if (!isRepo(name)) return ErrorResponse.NotFound();

    //   return HttpResponse.json(repos[name]);
    // }),
  ];
  if (enable.delay) {
    console.log('%c[MSW] Delay enabled.', 'color: red');
    items.unshift(delayHandler);
  }
  if (enable.passthrough) {
    console.log('%c[MSW] Passthrough enabled.', 'color: red');
    items.unshift(passthroughHandler);
  }
  return items;
})();
