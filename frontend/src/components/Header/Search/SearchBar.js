import './SearchBar.css';

export const SearchBar = ({ setTicker }) => {
  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      setTicker(e.target.value);
    }
  };
  return (
    <div className='search-container'>
      <img
        src='search-normal.svg'
        alt='search bar search button'
        width='24px'
        height='24px'
        color='#666666'
      />
      <input
        placeholder='SEARCH'
        className='search-input'
        onKeyDown={(e) => handleEnter(e)}
      ></input>
    </div>
  );
};
