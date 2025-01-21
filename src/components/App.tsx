import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Profile } from '@/components/Profile';
import { ReposList } from '@/components/ReposList';
import { useProfile } from '@/hooks/useProfile';

import '@/components/app.css';

export function App({ id }: { id: string }) {
  const { currentData } = useProfile();
  const itemsMax = currentData?.public_repos;

  return (
    <>
      <Header id={id} />
      <main className="main">
        <div className="main-contents">
          <Profile />
          {itemsMax === 0 ? null : <ReposList itemsMax={itemsMax} />}
        </div>
      </main>
      <Footer />
    </>
  );
}
