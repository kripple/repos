import { useCallback, useEffect, useState } from 'react';

import { App } from '@/components/App';
import { ModalProvider } from '@/components/ModalProvider';

import '@/assets/mui.css';
import '@/components/theme.css';

export function Theme() {
  const storageKey = 'reposTheme' as const;
  const id = 'theme-toggle' as const;

  const [savedTheme] = useState(
    document.documentElement.getAttribute('data-theme'),
  );

  const setTheme = useCallback((theme: 'light' | 'dark') => {
    const themeColor =
      theme === 'light' ? 'var(--light-mode)' : 'var(--dark-mode)';
    document.documentElement.style.backgroundColor = themeColor;
    window.localStorage.setItem(storageKey, theme);
  }, []);

  const onChange = useCallback((event: ChangeEvent) => {
    setTheme(event.target.checked ? 'light' : 'dark');
  }, []);

  useEffect(() => {
    if (!savedTheme) return;
    setTheme(savedTheme === 'light' ? 'light' : 'dark');
    document.documentElement.removeAttribute('data-theme');
  }, [savedTheme]);

  return (
    <>
      <input
        aria-hidden={true}
        defaultChecked={savedTheme === 'light'}
        id={id}
        onChange={onChange}
        style={{ display: 'none' }}
        type="checkbox"
      />
      <div className="app theme">
        <ModalProvider>
          <App id={id} />
        </ModalProvider>
      </div>
    </>
  );
}
