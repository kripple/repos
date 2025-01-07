// import { useEffect } from 'react';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Profile } from '@/components/Profile';
import { Repo } from '@/components/Repo';
import { Theme } from '@/components/Theme';
import { useProfile } from '@/hooks/useProfile';
import { useRepos } from '@/hooks/useRepos';

import '@/components/app.css';

export function App() {
  const id = 'theme-toggle';

  const { repos: count } = useProfile();
  const { repos } = useRepos(count);

  // useEffect(() => {
  //   console.log(profile);
  // }, [profile]);

  // useEffect(() => {
  //   console.log(repos);
  // }, [repos]);

  return (
    <Theme id={id}>
      <Header id={id} />
      <main className="main">
        <div className="contents">
          <Profile />
          {repos.map((repo) => (
            <Repo key={repo.name} name={repo.name} />
          ))}
          {/* {repos[0]?.name ? <Repo name={repos[0].name} /> : null} */}
        </div>
      </main>
      <Footer />
    </Theme>
  );
}
