import { FC, memo, Suspense } from 'react';
import ProjectFilter from 'contexts/projectProviderFilter';
import Nav from './Nav';
import Header from './Header';
import Spinner from 'components/common/Spinner';

const Layout: FC = memo(({ children }) => {
  // const { isLoggedIn } = useContext(AuthContext);
  // const { project } = useContext(ProjectContext);
  // const ImageManager = useMatch('/image-manager');

  return (
    <>
      <Nav />
      <Header />
      <Suspense fallback={<Spinner />}>
        <div id="wrapper">
          <ProjectFilter>
            {children}
          </ProjectFilter>
        </div>
      </Suspense>
    </>
  );
});

export default Layout;

