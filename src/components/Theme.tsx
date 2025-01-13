import type { ReactNode } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

import '@/components/theme.css';

export function Theme({ children, id }: { children: ReactNode; id: string }) {
  const storageKey = 'reposTheme' as const;
  const ref = useRef<HTMLDivElement>(null);

  const [savedTheme] = useState(
    document.documentElement.getAttribute('data-theme'),
  );

  useEffect(() => {
    if (!savedTheme || !['light', 'dark'].includes(savedTheme)) return;
    window['localStorage'].setItem(storageKey, savedTheme);
  }, [savedTheme]);

  useEffect(() => {
    if (!ref.current) return;
    const themeColor = window.getComputedStyle(ref.current).backgroundColor;
    document.documentElement.style.backgroundColor = themeColor;
    document.documentElement.removeAttribute('data-theme');
  }, [ref]);

  const onChange = useCallback((event: ChangeEvent) => {
    const theme = event.target.checked ? 'light' : 'dark';
    const current = ref.current;

    window['localStorage'].setItem(storageKey, theme);
    const style = current && window.getComputedStyle(current);
    const themeColor = style?.backgroundColor;
    if (themeColor) {
      document.documentElement.style.backgroundColor = themeColor;
    }
  }, []);

  return (
    <>
      <input
        aria-label="theme toggle"
        defaultChecked={savedTheme === 'light'}
        id={id}
        onChange={onChange}
        style={{ display: 'none' }}
        type="checkbox"
      />
      <div className="app theme" ref={ref}>
        {children}
      </div>
    </>
  );
}
