import type {
  ChangeEvent as ChangeEventType,
  Dispatch,
  MouseEvent,
  ReactNode as ReactNodeType,
  SetStateAction,
} from 'react';

export type ChangeEvent = ChangeEventType<HTMLInputElement>;

export type ClickEvent = MouseEvent<HTMLButtonElement>;

export type ReactNode = ReactNodeType;

export type SetState<T> = Dispatch<SetStateAction<T>>;
