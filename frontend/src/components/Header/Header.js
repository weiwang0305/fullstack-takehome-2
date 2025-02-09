import './Header.css';
import { SearchBar } from './Search/SearchBar';
import { Profile } from './Profile/Profile';

export const Header = () => {
  return (
    <header className='app-header'>
      <SearchBar />
      <Profile />
    </header>
  );
};
