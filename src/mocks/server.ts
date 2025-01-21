import { setupServer } from 'msw/node';

import { handlers } from '@/api/handlers';

export const server = setupServer(...handlers);
type ServerEvent = Parameters<typeof server.events.on>['0'];

export const addRequestListeners = async ({
  expected = 0,
  timeout = 200,
}: {
  expected?: number;
  timeout?: number;
}) => {
  const ids: string[] = [];
  const entities: {
    [key: string]: string;
  } = {};
  const status: {
    [key: string]: ServerEvent[];
  } = {};

  return new Promise<{ ids: typeof ids; entities: typeof entities }>(
    (resolve, reject) => {
      server.events.on('request:start', ({ request, requestId }) => {
        ids.push(requestId);
        entities[requestId] = request.url;
        status[requestId] = ['request:start'];
      });

      server.events.on('request:match', ({ requestId }) => {
        status[requestId].push('request:match');
      });

      server.events.on('request:end', ({ requestId }) => {
        status[requestId].push('request:end');
        if (ids.length >= expected) {
          if (ids.every((id) => status[id].includes('request:match'))) {
            resolve({ ids, entities });
          } else {
            reject({ ids, entities, error: 'unmatched requests' });
          }
        }
      });

      server.events.on('request:unhandled', ({ request, requestId }) => {
        status[requestId].push('request:unhandled');
        reject({
          ids,
          entities,
          error: `unhandled request url '${request.url}'`,
        });
      });

      server.events.on('response:bypass', ({ request, requestId }) => {
        status[requestId].push('response:bypass');
        reject({
          ids,
          entities,
          error: `unmocked response sent for url '${request.url}'`,
        });
      });

      setTimeout(() => {
        reject({ ids, entities, error: 'timeout' });
      }, timeout);
    },
  );
};
