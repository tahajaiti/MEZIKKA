import { ReactNode } from 'react';

const MainLayout: React.FC<{ children: ReactNode }> = ({ children }) => {

  return (
    <main className='min-h-screen'>
      {children}
    </main>
  )
}

export default MainLayout