import { cart } from '@/test/mocks/cart';

// eslint-disable-next-line @typescript-eslint/ban-types
export function Component({ hook }: { hook?: Function }) {
  hook?.();

  const apples = cart.getApples();
  const oranges = cart.getOranges();

  return (
    <ul data-testid="Component">
      <li>{`apples: ${apples}`}</li>
      <li>{`oranges: ${oranges}`}</li>
    </ul>
  );
}
