import { Outlet, useNavigation } from 'react-router-dom';
import CartOverview from '../Features/Cart/CartOverview';
import Header from './Header';
import LoadingSpinner from './LoadingSpinner';

const AppLayout = () => {
  const navigate = useNavigation();

  const isLoading = navigate.state === 'loading';

  return (
    <div className='layout'>
      {isLoading && <LoadingSpinner />}

      <Header />

      <main>
        <Outlet />
      </main>

      <CartOverview />
    </div>
  );
};

export default AppLayout;
