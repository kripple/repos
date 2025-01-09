import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Profile } from '@/components/Profile';
import { ReposList } from '@/components/ReposList';
import { Theme } from '@/components/Theme';
import { useProfile } from '@/hooks/useProfile';

import '@/components/app.css';

// Comparing the object's location with the window object's parent location. Here, we simply compare the object's location with the window object's parent location. If the result is true, then the webpage is in an iFrame. If it is false, then it is not in an iFrame.

// function inIframe () {
//   try {
//       return window.self !== window.top;
//   } catch (e) {
//       return true;
//   }
// }

export function App() {
  const id = 'theme-toggle';
  const { currentData } = useProfile();
  const itemsMax = currentData?.public_repos;

  return (
    <Theme id={id}>
      <Header id={id} />
      <main className="main">
        <div className="main-contents">
          <Profile />
          {itemsMax === 0 ? null : <ReposList itemsMax={itemsMax} />}
        </div>
      </main>
      <Footer />
    </Theme>
  );
}
