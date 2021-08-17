import { FC, useContext, Suspense } from 'react';
import { AuthContext } from 'contexts/authContext';
import { ProjectContext } from 'contexts/projectContext';
import ProjectFilter from 'contexts/projectProviderFilter';
import Nav from './Nav';
import Header from './Header';

const Layout: FC = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const { project } = useContext(ProjectContext);
  console.log("isLoggedIn: ", isLoggedIn);
  // const ImageManager = useMatch('/image-manager');

  return (
    <>
      <Nav isLoggedIn={isLoggedIn} project={project} />
      <Header isLoggedIn={isLoggedIn} project={project} />
      <Suspense fallback={<div className='spinner'></div>}>
        <div id="wrapper">
          <ProjectFilter>
            {children}
          </ProjectFilter>
        </div>
      </Suspense>
    </>
  );
}

export default Layout;

