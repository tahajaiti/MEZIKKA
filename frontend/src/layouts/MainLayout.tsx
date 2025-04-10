import { ReactNode } from 'react';
import Header from '../components/Global/Header';
import Player from '../components/Player/Player';

const MainLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col">
      <Header />
      {children}
      <Player />
    </div>
  );
};

export default MainLayout;