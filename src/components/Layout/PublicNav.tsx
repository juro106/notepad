import { FC, memo } from 'react';
import { Link } from 'react-router-dom';
import Search from 'components/Search';
// import { AiFillHome } from 'react-icons/ai';

const PublicNav: FC = memo(() => {
  return (
    <nav id="nav">
      <div id="nav-inner">
        <Link className='nav-item-link' to='/'>
          <div className='sa-icon'></div>
        </Link>
        <Search project='public' isLoggedIn={false} />
      </div>
      <header id='header'></header>
    </nav>
  );
});

export default PublicNav;

