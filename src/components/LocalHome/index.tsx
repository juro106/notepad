import { FC, useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { AuthContext } from 'contexts/authContext';
import ProjectSelector from 'components/Project/ProjectSelector';
import Spinner from 'components/common/Spinner';
import Menu from './Menu';

const LocalHome: FC = () => {
  const { loading, isLoggedIn, isLoaded } = useContext(AuthContext);
  console.log("loading: ", loading);
  console.log("isLoaded: ", isLoaded);

  if (isLoggedIn && isLoaded) {
    return <Page />;
  } else if (!isLoaded) {
    return <div className='loading'><p>...Loading</p><Spinner /></div>;
  } else {
    return <main><h1 className='hi-people'>Hi People!!</h1></main>;
  }
}

const Page: FC = () => {
  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name='robots' content='noindex nofollow' />
      </Helmet>
      <main className='user-home'>
        <header className='user-home-header'>
          <h1 className='visuallyhidden'>Sasa-box UserHome</h1>
        </header>
        <ProjectSelector />
        <Menu />
      </main>
    </>
  );
}

export default LocalHome;

