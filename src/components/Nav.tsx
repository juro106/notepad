import { FC, useContext } from 'react';
import { Link } from 'react-router-dom';
import Login from 'components/Login';
import { AuthContext } from 'contexts/authContext';

const Nav: FC = () => {
  const { currentUser: user } = useContext(AuthContext);

  return (
    <nav id="nav">
      <div id="nav-left">
        <Link className='nav-item-link' to='/'>Home</Link>
        {user ? <Link className='nav-item-link' to='/about'>About</Link> : ''}
        {user ? <Link className='nav-item-link' to='/edit'>Edit</Link> : ''}
        {user ? <Link className='nav-item-link' to='/new'>New</Link> : ''}
      </div>
      {user ?<div className="edit-new"><Link to='/new' className="edit-new-link">＋</Link></div> : ''}
      <div id="nav-right">
        <Login />
      </div>
    </nav>
  );
}

export default Nav;
