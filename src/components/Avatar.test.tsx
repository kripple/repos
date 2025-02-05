import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { api } from '@/api/endpoints';
import { Avatar } from '@/components/Avatar';
import { addRequestListeners } from '@/mocks/server';

const renderComponent = () => ({
  user: userEvent.setup(),
  ...render(
    <ApiProvider api={api}>
      <Avatar />
    </ApiProvider>,
  ),
});

describe('Avatar', () => {
  it('should mock requests', async () => {
    const promise = addRequestListeners({ expected: 1 });

    const { getByTestId } = renderComponent();
    await waitFor(async () => {
      expect(getByTestId('Avatar')).toHaveAttribute('data-loaded', 'true');
    });

    const result = await promise;
    expect(result.ids).toHaveLength(1);
    const expected = 'https://api.github.com/users/kripple';
    const actual = result.entities[result.ids[0]];

    expect(actual).toBe(expected);
  });

  it.todo(
    'should add the "loaded" class to the shimmer element once the image is loaded',
    async () => {
      const { getByTestId } = renderComponent();

      // Simulate image load event
      const img = getByTestId('Avatar').querySelector('img');
      if (img) {
        act(() => {
          img.dispatchEvent(new Event('load'));
        });
      }
      await waitFor(() => {
        expect(img).toHaveAttribute('data-loaded', 'true');
      });

      fireEvent.animationIteration(getByTestId('AvatarShimmer'));

      // Wait for the shimmer element to have the 'loaded' class after the image has loaded
      await waitFor(() => {
        expect(getByTestId('AvatarShimmer')).toHaveClass('loaded');
      });
    },
  );
});
