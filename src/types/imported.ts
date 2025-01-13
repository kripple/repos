import type {
  Dispatch,
  MouseEvent,
  ChangeEvent as ReactChangeEvent,
  SetStateAction,
} from 'react';

export type ChangeEvent = ReactChangeEvent<HTMLInputElement>;

export type ClickEvent = MouseEvent<HTMLButtonElement>;

export type SetState<T> = Dispatch<SetStateAction<T>>;
