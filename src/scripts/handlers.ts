import { HttpResponse, http } from 'msw';

import { imageData } from '@/data/avatar';
import { isPage, pages } from '@/data/pages';
import { profile } from '@/data/profile';
import { isRepo, repos } from '@/data/repos';
import { toArrayBuffer } from '@/scripts/utils';

export const handlers = [
  http.get('https://api.github.com/users/:username', () => {
    return HttpResponse.json(profile);
  }),

  http.get('https://api.github.com/users/:username/repos', ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get('page');

    if (!isPage(page)) {
      return new HttpResponse('Not found', {
        status: 404,
        headers: {
          'Content-Type': 'text/plain',
        },
      });
    }

    return HttpResponse.json(pages[page]);
  }),

  http.get('https://avatars.githubusercontent.com/u/11916341', () => {
    return HttpResponse.arrayBuffer(toArrayBuffer(imageData));
  }),

  http.get('https://api.github.com/repos/:username/:name', ({ params }) => {
    const name = params.name;
    if (!isRepo(name)) {
      return new HttpResponse('Not found', {
        status: 404,
        headers: {
          'Content-Type': 'text/plain',
        },
      });
    }
    return HttpResponse.json(repos[name]);
  }),

  // http.get('https://api.github.com/repos/*/${repoId}/languages', () => {
  //   return HttpResponse.json({
  //     id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d',
  //     firstName: 'John',
  //     lastName: 'Maverick',
  //   });
  // }),

  // http.get('/resource', () => {
  //   // Respond with a network error.
  //   return HttpResponse.error()
  // }),
];
