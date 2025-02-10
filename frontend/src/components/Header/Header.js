import './Header.css';
import { SearchBar } from './Search/SearchBar';
import { Profile } from './Profile/Profile';

export const Header = ({ setTicker }) => {
  return (
    <header className='app-header'>
      <SearchBar setTicker={setTicker} />
      <Profile />
    </header>
  );
};
