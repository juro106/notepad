import { FC, useContext } from 'react';
import { Link } from 'react-router-dom';
import Login from 'components/Login';
import { AuthContext } from 'context/authContext';

const Nav: FC = () => {
  const { currentUser: user } = useContext(AuthContext);

  return (
    <nav id="nav">
      <div id="nav-left">
        <div><Link to='/'>Home</Link></div>
        <div><Link to='/about'>About</Link></div>
        <div><Link to='/editor'>Editor</Link></div>
        {user ? <div><Link to='/new'>New</Link></div> : ''}
        {user ?<div><Link to='/edit'>Edit</Link></div> : ''}
      </div>
      <div id="nav-right">
        <Login />
      </div>
    </nav>
  );
}
export default Nav;
