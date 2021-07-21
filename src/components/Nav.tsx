import { FC } from 'react';
import { Link } from 'react-router-dom';
import Login from 'components/Login';

const Nav: FC = () => {
  return (
    <nav id="nav">
      <div id="nav-left">
        <div><Link to='/'>Home</Link></div>
        <div><Link to='/about'>About</Link></div>
        <div><Link to='/editor'>Editor</Link></div>
        <div><Link to='/demo'>Demo</Link></div>
      </div>
      <div id="nav-right">
        <Login />
      </div>
    </nav>
  );
}
export default Nav;
