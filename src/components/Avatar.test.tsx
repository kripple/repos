import { ApiProvider } from '@reduxjs/toolkit/query/react';
import {
  fireEvent,
  render as reactRender,
  waitFor,
} from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, test } from 'vitest';

import { api } from '@/api/endpoints';
import { Avatar } from '@/components/Avatar';
import { addRequestListeners } from '@/mocks/server';

const render = () => ({
  user: userEvent.setup(),
  ...reactRender(
    <ApiProvider api={api}>
      <Avatar />
    </ApiProvider>,
  ),
});

describe('Avatar', () => {
  test('loads avatar', async () => {
    const { getByTestId } = render();
    expect(getByTestId('Avatar')).toBeInTheDocument();
    expect(getByTestId('AvatarShimmer')).toBeInTheDocument();

    await waitFor(async () => {
      expect(getByTestId('Avatar')).toHaveAttribute('data-loaded', 'true');
    });

    fireEvent.animationIteration(getByTestId('AvatarShimmer'));

    await waitFor(async () => {
      expect(getByTestId('AvatarShimmer')).toHaveClass('loaded');
    });
  });

  test('mocks requests', async () => {
    const promise = addRequestListeners({ expected: 1 });

    const { getByTestId } = render();
    await waitFor(async () => {
      expect(getByTestId('Avatar')).toHaveAttribute('data-loaded', 'true');
    });
    fireEvent.animationIteration(getByTestId('AvatarShimmer'));
    await waitFor(async () => {
      expect(getByTestId('AvatarShimmer')).toHaveClass('loaded');
    });

    const result = await promise;
    expect(result.ids).toHaveLength(1);
    const expected = 'https://api.github.com/users/kripple';
    const actual = result.entities[result.ids[0]];

    expect(actual).toBe(expected);
  });
});
