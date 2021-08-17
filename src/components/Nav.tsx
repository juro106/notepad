import { FC } from 'react';
import { Link } from 'react-router-dom';
import Search from 'components/Search';
import LoginButton from 'components/LoginButton';
import { AiFillHome } from 'react-icons/ai';

type NavProps = {
  isLoggedIn: boolean;
  project: string | undefined;
}

const Nav: FC<NavProps> = ({ isLoggedIn, project }) => {

  return (
    <nav id="nav">
      <div id="nav-inner">
        <Link className='nav-item-link' to={isLoggedIn ? '/local/home' : '/'}>
          {isLoggedIn ?  <AiFillHome size={20} /> : <div className='sa-icon'></div> }
        </Link>
        <Search project={project ? project : 'public'} isLoggedIn={isLoggedIn ? true : false} />
        <LoginButton />
      </div>
    </nav>
  );
}

export default Nav;

