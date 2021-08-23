import { FC, useRef, Suspense, useEffect } from 'react';
import { useParams } from 'react-router';
import { useQuery } from 'react-query';
import getContent from 'services/get-content';
import getRelated from 'services/get-related';
import ErrorBoundary from 'ErrorBoundary';
import Main from './Main';
import Related from './Related';
import Spinner from 'components/common/Spinner';

const MainContents: FC = () => {
  const { slug } = useParams();
  const { data: mainData } = useQuery(['page', slug], () => getContent('', slug, false));
  const { data: relatedData } = useQuery(['related', slug], () => getRelated('', slug, false));
  const ebKey = useRef(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  if (mainData) {
    return (
      <ErrorBoundary key={`eb_1_${ebKey.current}`}>
        <Suspense fallback={<Spinner />}>
          <Main data={mainData} />
        </Suspense>
        <Suspense fallback={<Spinner />}>
          <Related data={relatedData && relatedData} />
        </Suspense>
      </ErrorBoundary>
    );
  }

  return <></>
}

export default MainContents;

