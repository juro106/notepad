import { FC, memo, Suspense } from 'react';
import { useProject } from 'hooks/useProject';
import LocalPageOuter from 'components/Local/LocalPageOuter';
import ContentsListHeader from 'components/common/ContentsListHeader';
import ContentsList from './ContentsList';
import Spinner from 'components/common/Spinner';

const LocalProjectTop: FC = memo(() => {
  const project = useProject();

  return (
    <LocalPageOuter title={'public'}>
      <main>
        <ContentsListHeader />
        <Suspense fallback={<Spinner />}>
          <ContentsList project={project} />
        </Suspense>
      </main>
    </LocalPageOuter>
  );
});

export default LocalProjectTop;

