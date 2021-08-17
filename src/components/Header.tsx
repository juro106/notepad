import { FC } from 'react';
import { Link } from 'react-router-dom';
import CreateNewContent from 'components/Button/CreateNewContent';

type HeaderProps = {
  isLoggedIn: boolean;
  project: string | undefined;
}

const Header: FC<HeaderProps> = ({ isLoggedIn, project }) => {

  return (
    <header id="header">
      {isLoggedIn && project
        ?
        <div id="header-inner">
          <div className="header-item">
            <span className='sp-none'>current project:</span>
            <Link to={`/local/${project}/`} className="nav-project-name">{project}</Link>
          </div>
          <CreateNewContent />
        </div>
        : ''}
    </header>
  );
}

export default Header;

