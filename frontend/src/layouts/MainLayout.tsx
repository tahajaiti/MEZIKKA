import { Link, Outlet} from '@tanstack/react-router';

const MainLayout = () => {
  return (
    <div>
        <Outlet/>
        <footer>
            <h2>footer</h2>
        </footer>
    </div>
  )
}

export default MainLayout