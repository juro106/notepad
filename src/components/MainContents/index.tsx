import {
  FC, useRef, useContext, Suspense,
  // useEffect,
} from 'react';
import ErrorBoundary from 'ErrorBoundary';
import { useParams } from 'react-router';
import { AuthContext } from 'contexts/authContext';
import Page from './Page';

const MainContents: FC = () => {
  const { slug } = useParams();
  const { uid } = useContext(AuthContext);
  const ebKey = useRef(0);

  if (uid) {
    return (
      <ErrorBoundary key={`eb_1_${ebKey.current}`}>
        <Suspense fallback={<p>...Loading</p>}>
          <Page slug={slug} uid={uid} />
        </Suspense>
      </ErrorBoundary>
    );
  }

  return <></>
}

export default MainContents;
