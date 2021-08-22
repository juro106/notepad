import { FC, useRef, Suspense, useEffect } from 'react';
import ErrorBoundary from 'ErrorBoundary';
import { useParams } from 'react-router';
import Page from './Page';
import Spinner from 'components/common/Spinner';

const MainContents: FC = () => {
  const { slug } = useParams();
  const ebKey = useRef(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <ErrorBoundary key={`eb_1_${ebKey.current}`}>
      <Suspense fallback={<Spinner />}>
        <Page slug={slug} />
      </Suspense>
    </ErrorBoundary>
  );
}

export default MainContents;

