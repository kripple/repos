import { useCallback } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';

type KeyboardEvent = ReactKeyboardEvent<
  HTMLLabelElement & HTMLButtonElement & HTMLAnchorElement & HTMLInputElement
>;
type EventCode = KeyboardEvent['code'];
type EventTarget = Pick<KeyboardEvent['currentTarget'], 'click' | 'blur'>;

export const useOnKeyDown = () => {
  return useCallback(
    (event: { code: EventCode; currentTarget: EventTarget }) => {
      if (event.code === 'Enter') {
        event.currentTarget.click();
      }
      if (event.code === 'Escape') {
        event.currentTarget.blur();
      }
    },
    [],
  );
};
