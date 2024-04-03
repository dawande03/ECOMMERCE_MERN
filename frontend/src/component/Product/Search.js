import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    console.log('click check',e);
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate('/products');
    }
  };

  const handleInputChange = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <Fragment>
      <form className='searchBox' onSubmit={searchSubmitHandler}>
        <input
          type='text'
          placeholder='Search a Product ...'
          onChange={handleInputChange}
        />
        <button type='submit'>Search</button>
      </form>
    </Fragment>
  );
};

export default Search;
