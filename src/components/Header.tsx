import { FC } from 'react';
import { Link } from 'react-router-dom';
import Search from 'components/Search';
import CreateNewContent from 'components/Button/CreateNewContent';

type HeaderProps = {
  isLoggedIn: boolean;
  project: string | undefined;
}

const Header: FC<HeaderProps> = ({ isLoggedIn, project }) => {

  return (
    isLoggedIn && project
      ?
      <header id="header">
        <div className='header-item'>
          <span className='sp-none'>current project:</span>
          <Link to={`/local/${project}/`} className="nav-project-name">{project}</Link>
        </div>
        <div className='header-item'>
          <Search project={project} isLoggedIn={true} />
        </div>
        <CreateNewContent />
      </header>
      :
      <header id="header">
        <div className='header-item'><Search project={'public'} isLoggedIn={false} /></div>
      </header>
  );
}

export default Header;

