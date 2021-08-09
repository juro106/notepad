import {
  FC,
  Suspense,
  SuspenseList
} from 'react';
import { useQuery } from 'react-query';
import getContent from 'services/get-content';
import getRelated from 'services/get-related';
import Main from './Main';
import Related from './Related';

const Page: FC<{ slug: string }> = ({ slug }) => {
  const { data: d1 } = useQuery(['page', slug], () => getContent('', slug, true));
  const { data: d2 } = useQuery(['related', slug], () => getRelated('', slug, true));

  return (
    <SuspenseList>
      <Suspense fallback={<div className="spinner"></div>}>
        <Main data={d1} />
      </Suspense>
      <Suspense fallback={<div className="spinner"></div>}>
        <Related data={d2} />
      </Suspense>
    </SuspenseList>
  );
}

export default Page;

