import { render as reactRender, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import random from 'just-random';
import { expect, test } from 'vitest';

import { AppProvider } from '@/components/AppProvider';

const render = () => ({
  user: userEvent.setup(),
  ...reactRender(<AppProvider />),
});

test('displays profile', () => {
  const { getByTestId } = render();

  expect(getByTestId('Profile')).toBeTruthy();
});

test('displays list of repos', () => {
  const { getByTestId } = render();

  expect(getByTestId('ReposList')).toBeTruthy();
});

test('displays search tools', () => {
  const { getByTestId, getByRole } = render();

  expect(getByTestId('SearchTools')).toBeTruthy();

  const search = getByRole('search');
  expect(search).toBeTruthy();
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

test.todo('repos are selectable', async () => {
  const { findAllByTestId, user } = render();

  const list = await findAllByTestId('Repo');
  const repo = random(list);
  if (!repo) throw Error('something went wrong');

  // const button = repo.querySelector('')

  user.click(repo);

  // click it
  // check that it is expanded
  // check that search bar is hidden
  // click on close button
  // check that it is no longer expanded
  // check that search bar is visible
  // check value of search input to verify that it is persisted
});
