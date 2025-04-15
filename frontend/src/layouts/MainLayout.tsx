import Header from '../components/Global/Header';
import Player from '../components/Player/Player';
import { Outlet } from 'react-router';

const MainLayout: React.FC = () => {
  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col">
      <Header />
      <main className='h-full w-full overflow-auto'>
        <Outlet/>
      </main>
      <Player />
    </div>
  );
};

export default MainLayout;