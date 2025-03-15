import { render as reactRender, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, test } from 'vitest';

import { AppProvider } from '@/components/AppProvider';
import { addRequestListeners } from '@/mocks/server';

const render = () => ({
  user: userEvent.setup(),
  ...reactRender(<AppProvider />),
});

describe('App', () => {
  test('displays profile', () => {
    const { getByTestId } = render();
    expect(getByTestId('Profile')).toBeInTheDocument();
  });

  test('displays avatar', () => {
    const { getByTestId } = render();
    expect(getByTestId('Avatar')).toBeInTheDocument();
  });

  test('displays list of repos', () => {
    const { getByTestId } = render();
    expect(getByTestId('ReposList')).toBeInTheDocument();
  });

  test('displays search tools', () => {
    const { getByTestId, getByRole } = render();
    expect(getByTestId('SearchTools')).toBeInTheDocument();

    const search = getByRole('search');
    expect(search).toBeInTheDocument();
  });

  test('mocks requests', async () => {
    const promise = addRequestListeners({ expected: 2 });
    const { getByTestId, getByRole } = render();

    expect(getByTestId('Profile')).toBeInTheDocument();
    expect(getByTestId('ReposList')).toBeInTheDocument();
    expect(getByTestId('SearchTools')).toBeInTheDocument();
    expect(getByRole('search')).toBeInTheDocument();

    const result = await promise;

    expect(result.ids).toHaveLength(2);
    const expected = [
      'https://api.github.com/users/kripple',
      'https://api.github.com/users/kripple/repos?per_page=85&page=1&sort=updated',
    ];
    result.ids.map((id) => {
      const actual = result.entities[id];
      expect(expected).includes(actual);
    });
  });

  test('repos list is searchable', async () => {
    const { findAllByTestId, getByRole, user } = render();
    expect(await findAllByTestId('Repo')).toHaveLength(85);

    const search = getByRole('search').closest('input');
    if (!search) throw Error('expect input to be in the document');
    await user.type(search, 'et');

    await waitFor(async () => {
      expect(search.value).toBe('et');
      expect(await findAllByTestId('Repo')).toHaveLength(3);
    });
  });
});
