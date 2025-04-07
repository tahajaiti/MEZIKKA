import { ReactNode } from 'react';
import Aside from '../components/Global/Aside';
import Header from '../components/Global/Header';
import Player from '../components/Player/Player';

const MainLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1 overflow-hidden">
        <Aside />
        <main className="flex flex-col w-full overflow-hidden">
          <Header />
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </main>
      </div>
      <Player />
    </div>
  );
};

export default MainLayout;
