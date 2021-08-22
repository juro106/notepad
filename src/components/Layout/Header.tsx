import { FC, memo, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from 'contexts/authContext';
import { useProject } from 'hooks/useProject';
import CreateNewContent from 'components/Button/CreateNewContent';


// <Link to='hookstest'>hookstest</Link>
const Header: FC = memo(() => {
  const { isLoggedIn } = useContext(AuthContext);
  const project = useProject();

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
});

export default Header;

