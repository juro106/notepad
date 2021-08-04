import { FC, useContext } from 'react';
import { Link } from 'react-router-dom';
import LoginButton from 'components/LoginButton';
import { AuthContext } from 'contexts/authContext';
import { ProjectContext } from 'contexts/projectContext';

const Nav: FC = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const { project } = useContext(ProjectContext);
  console.log("isLoggedIn: ", isLoggedIn);

  return (
    <>
      <nav id="nav">
        <div id="nav-left">
          <Link className='nav-item-link' to={isLoggedIn ? '/home' : '/'}>Home</Link>
          {isLoggedIn ? <Link className='nav-item-link' to='/about'>About</Link> : ''}
          {isLoggedIn ? <Link className='nav-item-link' to='/edit'>Edit</Link> : ''}
          {isLoggedIn ? <Link className='nav-item-link' to='/new'>New</Link> : ''}
        </div>
        {isLoggedIn ? <div className="edit-new"><Link to='/new' className="edit-new-link">＋</Link></div> : ''}
        <div id="nav-right">
          <LoginButton />
        </div>
      </nav>
      <header id="header">current project: <span className="project-name">{project}</span></header>
    </>
  );
}

export default Nav;
