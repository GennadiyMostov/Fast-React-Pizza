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
        placeholder='Search Order Number'
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
    </form>
  );
};

export default SearchOrder;
