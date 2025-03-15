import type { ReactNode, RefObject } from 'react';
import { createContext, useContext, useRef } from 'react';

const ModalContext = createContext<RefObject<HTMLDivElement | null> | null>(
  null,
);

// eslint-disable-next-line react-refresh/only-export-components
export const useModal = () => useContext(ModalContext)?.current;

export function ModalProvider({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <ModalContext.Provider value={ref}>
      <div id="modal" ref={ref} />
      {children}
    </ModalContext.Provider>
  );
}
