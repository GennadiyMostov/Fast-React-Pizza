import { Link } from 'react-router-dom';
import SearchOrder from '../Features/Order/SearchOrder';
import Username from '../Features/User/Username';

const Header = () => {
  return (
    <header className='border-b border-stone-400 bg-yellow-500 px-4 py-3 uppercase sm:px-6'>
      <Link className='tracking-widest' to='/'>
        Fast React Pizza Co.
      </Link>

      <SearchOrder />
      <Username />
    </header>
  );
};

export default Header;
