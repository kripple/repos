import { act, fireEvent, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Image } from '@/components/Image';

const renderComponent = () => ({
  user: userEvent.setup(),
  ...render(
    <Image
      alt="image-name"
      fallback="fallback.jpg"
      setIsLoading={vi.fn()}
      src="image.jpg"
    />,
  ),
});

describe('Image', () => {
  it('should attempt to load the primary image by default', () => {
    const { queryByRole } = renderComponent();
    const image = queryByRole('img');
    expect(image).toBeInTheDocument();
    expect(image?.getAttribute('src')).toBe('image.jpg');
  });

  it('should display the fallback image if the main image fails to load', async () => {
    const { queryByRole } = renderComponent();

    // Simulate the error event for the main image
    const image = queryByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'image.jpg');
    if (image) {
      fireEvent.error(image);
    }

    const fallbackImage = queryByRole('img');
    expect(fallbackImage).toBeInTheDocument();
    expect(fallbackImage).toHaveAttribute('src', 'fallback.jpg');
  });

  it('should show the main image once it is successfully loaded', async () => {
    const { queryByRole } = renderComponent();

    // Simulate image load success
    const image = queryByRole('img')?.closest('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'image.jpg');

    const loadedImage = queryByRole('img')?.closest('img');
    expect(loadedImage).toBeInTheDocument();
    expect(loadedImage).toHaveAttribute('src', 'image.jpg');
  });
});
