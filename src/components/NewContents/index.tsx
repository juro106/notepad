import {
  FC,
  useContext,
  Suspense,
} from 'react';
import { ImgSelectProvider } from 'contexts/imgSelectContext';
import { Helmet } from 'react-helmet-async';
import { AuthContext } from 'contexts/authContext';
// import ProjectFilter from 'contexts/projectProviderFilter';
import Page from './Page';

const NewPost: FC = () => {
  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return (
      <>
        <Helmet>
          <title>Create New Content</title>
          <meta name='robots' content='noindex nofollow' />
        </Helmet>
        <Suspense fallback={<p>...loading</p>}>
          <ImgSelectProvider>
            <Page />
          </ImgSelectProvider>
        </Suspense>
      </>
    );
  }

  return <></>
}

export default NewPost;

