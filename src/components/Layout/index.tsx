import { FC, memo, Suspense } from 'react';
import Nav from './Nav';
import Header from './Header';
import Spinner from 'components/common/Spinner';

const Layout: FC = memo(({ children }) => {

  return (
    <>
      <Nav />
      <Header />
      <Suspense fallback={<Spinner />}>
        <div id="wrapper">
          {children}
        </div>
      </Suspense>
    </>
  );
});

export default Layout;

