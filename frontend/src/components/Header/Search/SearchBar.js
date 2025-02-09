import './SearchBar.css';

export const SearchBar = () => {
  return (
    <div className='search-container'>
      <img
        src='search-normal.svg'
        alt='search bar search button'
        width='24px'
        height='24px'
        color='#666666'
      />
      <input placeholder='SEARCH' className='search-input'></input>
    </div>
  );
};
