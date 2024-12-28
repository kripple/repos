import { useEffect } from 'react';

import { Card } from '@/components/Card';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Theme } from '@/components/Theme';
import { useProfile } from '@/hooks/useProfile';

import '@/components/app.css';

export function App() {
  const id = 'theme-toggle';

  const profile = useProfile();

  useEffect(() => {
    console.log(profile);
  }, [profile]);

  return (
    <Theme id={id}>
      <Header id={id} />
      <main className="main">
        <Card />
      </main>
      <Footer />
    </Theme>
  );
}
