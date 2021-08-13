import { FC } from 'react';
import { Link } from 'react-router-dom';
import LoginButton from 'components/LoginButton';

type NavProps = {
  isLoggedIn: boolean;
  project: string | undefined;
}

const Nav: FC<NavProps> = ({ isLoggedIn, project }) => {

  return (
    <>
      <nav id="nav">
        <div id="nav-left">
          <Link className='nav-item-link' to={isLoggedIn ? '/home' : '/'}>Home</Link>
          {isLoggedIn && project ?
            <>
              <Link className='nav-item-link' to='/about'>About</Link>
              <Link className='nav-item-link' to='/edit'>Edit</Link>
              <Link className='nav-item-link' to='/image-manager'>Images</Link>
              <Link className='nav-item-link' to='/new'>New</Link>
            </>
            : ''}
        </div>
        <div id="nav-right">
          <LoginButton />
        </div>
      </nav>

    </>
  );
}

export default Nav;

