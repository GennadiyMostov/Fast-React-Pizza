import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './UI/Home';
import Menu, { loader as menuLoader } from './Features/Menu/Menu';
import Cart from './Features/Cart/Cart';
import CreateOrder from './Features/Order/CreateOrder';
import Order from './Features/Order/Order';
import AppLayout from './UI/AppLayout';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/menu',
        element: <Menu />,
        loader: menuLoader,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/order/new',
        element: <CreateOrder />,
      },
      { path: '/order/:orderID', element: <Order /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
