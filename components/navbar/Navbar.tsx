import ModeToggleButton from './ModeToggleButton';
import LinksDropdown from './LinksDropdown';
import Logo from './Logo';
import NavSearch from './NavSearch';
import SignInButton from './SignInButton';
import { getAuthUser } from '@/utils/auth';

async function Navbar() {
  const user = await getAuthUser();

  return (
    <nav className='border-b'>
      <div className='container flex flex-col flex-wrap gap-4 py-8 sm:flex-row sm:items-center sm:justify-between'>
        <Logo />
        <NavSearch />
        <div className='flex items-center gap-4'>
          <ModeToggleButton />
          {user ? <LinksDropdown /> : <SignInButton />}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
