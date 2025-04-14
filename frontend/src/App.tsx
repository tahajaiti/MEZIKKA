import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import render from './routes/render';
import routes from './routes';
import Toast from './components/Global/Toast';
import { Routes } from 'react-router';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        {render(routes)}
      </Routes>
      <Toast />
    </QueryClientProvider>
  )
}

export default App