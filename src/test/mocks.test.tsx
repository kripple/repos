import { render } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import { Component } from '@/test/Component';
import { cart as externalCart } from '@/test/mocks/cart';
import { market } from '@/test/mocks/market';

vi.mock(import('@/test/mocks/cart'), async (importOriginal) => {
  const { cart: actual } = await importOriginal(); // type is inferred
  return {
    cart: {
      ...actual,
      getOranges: () => 13,
    },
  };
});

describe('Mocks', () => {
  test('mockImplementation', () => {
    let apples = 0;
    const cart = {
      getApples: () => 42,
    };

    expect(cart.getApples()).toBe(42);
    const spy = vi.spyOn(cart, 'getApples').mockImplementation(() => apples);
    apples = 1;

    expect(cart.getApples()).toBe(1);

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveReturnedWith(1);
    spy.mockRestore();
  });

  test('mockImplementation with external module', () => {
    let apples = 2;

    expect(externalCart.getApples()).toBe(42);
    const spy = vi
      .spyOn(externalCart, 'getApples')
      .mockImplementation(() => apples);
    apples = 3;

    expect(externalCart.getApples()).toBe(3);

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveReturnedWith(3);
    spy.mockRestore();
  });

  test('mock internal module method', () => {
    let apples = 4;

    expect(market.cart.getApples()).toBe(42);
    const spy = vi
      .spyOn(market.cart, 'getApples')
      .mockImplementation(() => apples);
    apples = 5;

    expect(externalCart.getApples()).toBe(5);

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveReturnedWith(5);
    spy.mockRestore();
  });

  test('mock internal component method', () => {
    const { getByText, queryByText } = render(<Component />);
    expect(getByText('apples: 42')).toBeTruthy();
    expect(queryByText('oranges: 13')).toBeTruthy();
    expect(queryByText('oranges: 69')).not.toBeTruthy();
  });

  test.todo('mock top-level external import', () => {
    // mock getLemons using a module mock / default import
  });
});
