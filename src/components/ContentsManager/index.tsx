import { FC, memo, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import ContentsList from 'components/LocalProjectTop/ContentsList';
import PageTitle from 'components/Heading/PageTitle';
import Spinner from 'components/common/Spinner';

const ContentsManager: FC = memo(() => {
  return (
    <>
      <Helmet>
        <title>Edit</title>
        <meta name='robots' content='noindex nofollow' />
      </Helmet>
      <main>
        <Suspense fallback={<Spinner />}>
          <PageTitle>メモを編集</PageTitle>
          <ContentsList />
        </Suspense>
      </main>
    </>
  );
});

export default ContentsManager;

