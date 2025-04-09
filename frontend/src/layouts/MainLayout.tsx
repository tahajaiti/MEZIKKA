import { ReactNode } from 'react';
import Aside from '../components/Global/Aside';
import Header from '../components/Global/Header';
import Player from '../components/Player/Player';

const MainLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        <Aside />

        <div className="flex-1 flex flex-col h-full relative">
          <Header />

          {children}

        </div>
      </div>
      <Player />
    </div>
  );
};

export default MainLayout;