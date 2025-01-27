import { render as reactRender, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import random from 'just-random';
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

  test('select a repo', async () => {
    const { findAllByTestId, queryByRole, user } = render();

    const list = await findAllByTestId('Repo');
    const repo = random(list);
    const button: HTMLButtonElement | undefined | null = repo?.querySelector(
      `button[data-testid="SelectRepoButton"]`,
    );
    if (!repo || !button) throw Error('something went wrong');
    expect(repo).not.toHaveClass('selected');
    expect(queryByRole('search')).toBeInTheDocument();
    user.click(button);

    // check that it is expanded
    await waitFor(async () => {
      expect(repo).toHaveClass('selected');
    });

    // check that search bar is hidden
    expect(queryByRole('search')).toBe(null);

    // click on close button
    const closeButton: HTMLButtonElement | null = repo.querySelector(
      `button[data-testid="CloseButton"]`,
    );
    if (!closeButton) throw Error('something went wrong');
    user.click(closeButton);

    // check that it is no longer expanded
    await waitFor(async () => {
      expect(repo).not.toHaveClass('selected');
    });

    // check that search bar is visible
    expect(queryByRole('search')).toBeInTheDocument();
  });

  test('input is persisted', async () => {
    const { findAllByTestId, queryByRole, user } = render();

    const search = queryByRole('search')?.closest('input');
    if (!search) throw Error('expect input to be in the document');
    await user.type(search, 'sc');

    const list = await findAllByTestId('Repo');
    const repo = random(list);
    const button: HTMLButtonElement | undefined | null = repo?.querySelector(
      `button[data-testid="SelectRepoButton"]`,
    );
    if (!repo || !button) throw Error('something went wrong');
    expect(repo).not.toHaveClass('selected');
    expect(queryByRole('search')).toBeInTheDocument();
    user.click(button);

    // check that it is expanded
    await waitFor(async () => {
      expect(repo).toHaveClass('selected');
    });

    // check that search bar is hidden
    expect(queryByRole('search')).toBe(null);

    // click on close button
    const closeButton: HTMLButtonElement | null = repo.querySelector(
      `button[data-testid="CloseButton"]`,
    );
    if (!closeButton) throw Error('something went wrong');
    user.click(closeButton);

    // check that it is no longer expanded
    await waitFor(async () => {
      expect(repo).not.toHaveClass('selected');
    });

    expect(queryByRole('search')).toBeInTheDocument();
    expect(queryByRole('search')?.closest('input')?.value).toBe('sc');
  });
});
