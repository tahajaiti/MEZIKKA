import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import render from './routes/render';
import routes from './routes';
import Toast from './components/Global/Toast';
import { Routes, useNavigate } from 'react-router';
import { useEffect } from 'react';
import { setNavigator } from './util/navigation';
import { AnimatePresence } from 'motion/react';
import ConfirmScreen from './components/Global/ConfirmScreen';
import SongContextMenu from './components/Song/SongContextMenu';

const queryClient = new QueryClient();

const NavigationHandler: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigator(navigate);
  }, [navigate]);

  return null;
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationHandler />
      <AnimatePresence mode="sync">
        <Routes>
          {render(routes)}
        </Routes>
      </AnimatePresence>
      <Toast />
      <ConfirmScreen />
      <SongContextMenu />
    </QueryClientProvider>
  )
}

export default App