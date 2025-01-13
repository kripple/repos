import { useMemo, useState } from 'react';

export const useFocus = () => {
  const [hasFocus, setHasFocus] = useState<boolean>(false);
  const onBlur = () => setHasFocus(false);
  const onFocus = () => setHasFocus(true);

  const memo = useMemo(
    () => ({
      hasFocus,
      onBlur,
      onFocus,
    }),
    [hasFocus],
  );

  return memo;
};
