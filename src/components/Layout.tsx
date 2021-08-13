import { FC, useContext } from 'react';
import { AuthContext } from 'contexts/authContext';
import { ProjectContext } from 'contexts/projectContext';
import Nav from 'components/Nav';
import Header from 'components/Header';

const Layout: FC = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const { project } = useContext(ProjectContext);
  console.log("isLoggedIn: ", isLoggedIn);
  // const ImageManager = useMatch('/image-manager');

  return (
    <>
      <Nav isLoggedIn={isLoggedIn} project={project} />
      <Header isLoggedIn={isLoggedIn} project={project} />
      <div id="wrapper">
        {children}
      </div>
    </>
  );
}

export default Layout;

