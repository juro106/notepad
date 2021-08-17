import { FC, memo, useContext, Suspense } from 'react';
import { ProjectContext } from 'contexts/projectContext';
import ContentsList from './ContentsList';
import ListSwitcher from 'components/Common/ListSwitcher';
import LocalPageOuter from 'components/Local/LocalPageOuter';

const LocalProjectTop: FC = memo(() => {
  const { project } = useContext(ProjectContext);

  return (
    <LocalPageOuter title={'public'}>
      <main>
        <ListSwitcher />
        <h1>コンテンツ一覧</h1>
        <Suspense fallback={<div className="spinner"></div>}>
          <ContentsList project={project} />
        </Suspense>
      </main>
    </LocalPageOuter>
  );
});

export default LocalProjectTop;

