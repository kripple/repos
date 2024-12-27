import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Theme } from '@/components/Theme';

import '@/components/app.css';

export function App() {
  const id = 'theme-toggle';

  return (
    <Theme toggleId={id}>
      <div className="body">
        <Header toggleId={id} />
        <main className="main"></main>
        <Footer />
      </div>
    </Theme>
  );
}
