// import { useEffect } from 'react';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Profile } from '@/components/Profile';
import { ReposList } from '@/components/ReposList';
import { Theme } from '@/components/Theme';
import { useProfile } from '@/hooks/useProfile';

import '@/components/app.css';

export function App() {
  const id = 'theme-toggle';

  const { repos: itemsMax } = useProfile();

  // useEffect(() => {
  //   console.log({itemsMax});
  // }, [itemsMax]);

  // useEffect(() => {
  //   console.log(repos);
  // }, [repos]);

  return (
    <Theme id={id}>
      <Header id={id} />
      <main className="main">
        <div className="main-contents">
          <Profile />
          {itemsMax > 0 ? <ReposList itemsMax={itemsMax} /> : null}
        </div>
      </main>
      <Footer />
    </Theme>
  );
}
