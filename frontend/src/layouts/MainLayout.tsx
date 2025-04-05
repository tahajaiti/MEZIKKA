import { Outlet, useLocation } from '@tanstack/react-router';
import routeConfig from '../routes';

const MainLayout = () => {
  const location = useLocation();
  const currRoute = routeConfig.find(r => r.path === location.pathname);

  if (!currRoute || currRoute.layout === false) {
    return <Outlet />
  }

  return (
    <div>
      <Outlet />
      <footer>
        <h2>footer</h2>
      </footer>
    </div>
  )
}

export default MainLayout