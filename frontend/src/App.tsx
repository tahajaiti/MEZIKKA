import { RouterProvider } from '@tanstack/react-router'
import { router } from './router'

const App = () => {
  return (
    <div>
        <RouterProvider router={router} />
    </div>
  )
}

export default App