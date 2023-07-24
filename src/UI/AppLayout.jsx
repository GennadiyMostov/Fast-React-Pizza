import { Outlet, useNavigation } from 'react-router-dom';
import CartOverview from '../Features/Cart/CartOverview';
import Header from './Header';
import LoadingSpinner from './LoadingSpinner';

const AppLayout = () => {
  const navigate = useNavigation();

  const isLoading = navigate.state === 'loading';

  return (
    <div className='grid h-screen grid-rows-[auto_1fr_auto]'>
      {isLoading && <LoadingSpinner />}

      <Header />
      <div className='overflow-scroll'>
        <main className='mx-auto max-w-3xl'>
          <Outlet />
        </main>
      </div>

      <CartOverview />
    </div>
  );
};

export default AppLayout;
