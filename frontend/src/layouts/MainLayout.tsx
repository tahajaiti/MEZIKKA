import { ReactNode } from 'react';
import Aside from '../components/Global/Aside';

const MainLayout: React.FC<{ children: ReactNode }> = ({ children }) => {

  return (
    <div className='flex gap-2 min-h-screen'>
      <Aside />
      <main className='md:mt-[3rem] p-10 mt-[7rem]'>
        {children}
      </main>
    </div>
  )
}

export default MainLayout