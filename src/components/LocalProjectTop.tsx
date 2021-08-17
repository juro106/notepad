import { FC, memo, useContext, Suspense } from 'react';
import { ProjectContext } from 'contexts/projectContext';
import ContentsList from 'components/ContentsList';
import ListSwitcher from 'components/ListSwitcher';
import LocalPageOuter from 'components/LocalPageOuter';

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

