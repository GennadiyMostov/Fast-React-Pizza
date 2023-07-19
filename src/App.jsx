import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './UI/Home';
import Menu from './Features/Menu/Menu';
import Cart from './Features/Cart/Cart';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/menu',
    element: <Menu />,
  },
  {
    path: '/cart',
    element: <Cart />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
