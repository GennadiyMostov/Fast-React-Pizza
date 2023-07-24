import { Link } from 'react-router-dom';
import SearchOrder from '../Features/Order/SearchOrder';
import Username from '../Features/User/Username';

const Header = () => {
  return (
    <header className='bg-yellow-500 uppercase'>
      <Link className='tracking-widest' to='/'>
        Fast React Pizza Co.
      </Link>

      <SearchOrder />
      <Username />
    </header>
  );
};

export default Header;
