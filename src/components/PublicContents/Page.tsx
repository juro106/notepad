import {
  FC,
  // Suspense,
  // SuspenseList
} from 'react';
import { useQuery } from 'react-query';
import getContent from 'services/get-content';
import getRelated from 'services/get-related';
import Main from './Main';
import Related from './Related';

const Page: FC<{ slug: string }> = ({ slug }) => {
  const { data: mainData } = useQuery(['page', slug], () => getContent('', slug, false));
  const { data: relatedData } = useQuery(['related', slug], () => getRelated('', slug, false));

  if (mainData) {
    return (
      <>
        <Main data={mainData} />
        <Related data={relatedData && relatedData} />
      </>
    );
  }
  return <></>
}

export default Page;

