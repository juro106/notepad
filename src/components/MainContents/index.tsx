import {
  FC, useRef, Suspense,
  // useEffect,
} from 'react';
import ErrorBoundary from 'ErrorBoundary';
import { useParams } from 'react-router';
import Page from './Page';

const MainContents: FC = () => {
  const { slug } = useParams();
  const ebKey = useRef(0);

  return (
    <ErrorBoundary key={`eb_1_${ebKey.current}`}>
      <Suspense fallback={<p>...Loading</p>}>
        <Page  slug={slug}/>
      </Suspense>
    </ErrorBoundary>
  )
}

export default MainContents;
