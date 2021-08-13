import { FC, useContext } from 'react';
import { ProjectContext } from 'contexts/projectContext';
import ContentsList from 'components/ContentsList';
import ListSwitcher from 'components/ListSwitcher';
import LocalPageOuter from 'components/LocalPageOuter';

const LocalProjectTop: FC = () => {
  const { project } = useContext(ProjectContext);

  return (
    <LocalPageOuter title={'public'}>
      <main>
        <ListSwitcher />
        <h1>コンテンツ一覧</h1>
        <ContentsList project={project} />
      </main>
    </LocalPageOuter>
  );
}

export default LocalProjectTop;

