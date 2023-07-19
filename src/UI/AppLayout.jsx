import CartOverview from '../Features/Cart/CartOverview';
import Header from './Header';

const AppLayout = () => {
  return (
    <div>
      <Header />

      <main>
        <h1>Content</h1>
      </main>

      <CartOverview />
    </div>
  );
};

export default AppLayout;
