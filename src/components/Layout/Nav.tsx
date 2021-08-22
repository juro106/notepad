import { FC, memo, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from 'contexts/authContext';
import { useProject } from 'hooks/useProject';
import Search from 'components/Search';
import { AiFillHome } from 'react-icons/ai';
import LoginButton from 'components/Login/LoginButton';

const Nav: FC = memo(() => {
  const { isLoggedIn } = useContext(AuthContext);
  const project = useProject();
  const homeSymbol = isLoggedIn ? <AiFillHome size={20}/> : <div className='sa-icon'></div>;

  return (
    <nav id="nav">
      <div id="nav-inner">
        <Link className='nav-item-link' to={isLoggedIn ? '/local/home' : '/'}>
          {homeSymbol}
        </Link>
        <Search project={project ? project : 'public'} isLoggedIn={isLoggedIn ? true : false} />
        <LoginButton />
      </div>
    </nav>
  );
});

export default Nav;

