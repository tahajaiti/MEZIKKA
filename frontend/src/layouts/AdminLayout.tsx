import AdminHeader from '../components/Global/AdminHeader';
import { Outlet } from 'react-router';

const AdminLayout: React.FC = () => {
  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col">
      <AdminHeader />
      <main className='h-full w-full overflow-auto'>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;