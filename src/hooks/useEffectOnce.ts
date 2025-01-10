import { useEffect, useRef } from 'react';
import type { EffectCallback } from 'react';

export const useEffectOnce = (effectCallback: EffectCallback) => {
  const firstRender = useRef(true);

  useEffect(() => {
    if (!firstRender.current) return;

    firstRender.current = false;
    effectCallback();
  }, []);
};
