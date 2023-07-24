import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchOrder = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!query) return;

    navigate(`/order/${query}`);

    setQuery('');

    console.log(query);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className='w-28 rounded-full bg-yellow-100 px-4 py-2 text-center text-sm outline-none transition-all duration-500 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:w-64 sm:focus:w-72'
        placeholder='Search Order Number'
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
    </form>
  );
};

export default SearchOrder;
