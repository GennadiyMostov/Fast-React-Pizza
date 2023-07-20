import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './UI/Home';
import Menu, { loader as menuLoader } from './Features/Menu/Menu';
import Cart from './Features/Cart/Cart';
import CreateOrder from './Features/Order/CreateOrder';
import Order, { loader as orderLoader } from './Features/Order/Order';
import AppLayout from './UI/AppLayout';
import Error from './UI/Error';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,

    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/menu',
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/order/new',
        element: <CreateOrder />,
      },
      {
        path: '/order/:orderID',
        element: <Order />,
        loader: orderLoader,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
