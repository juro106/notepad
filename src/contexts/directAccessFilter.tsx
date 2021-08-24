import { FC, Suspense } from 'react';
import { useLoginUser } from 'hooks/useLoginUser';
import { useProject } from 'hooks/useProject';
import { useSetProject } from 'hooks/useSetProject';
import ProjectSelector from 'components/Project/ProjectSelector';
import { useLocation } from 'react-router';
import TimeOut from 'components/Local/TimeOut';
import Spinner from 'components/common/Spinner';

/* ユーザーの認証を通過した後。実際にページが表示される前。
 * 個別のページに直接アクセスされることを想定した処理。必要があればプロジェクトを選んでもらうために使う。
*/
const DirectAccessFilter: FC = ({ children }) => {
  const currentUser = useLoginUser();
  const project = useProject();
  const setCurrentProject = useSetProject();
  const pathname = useLocation().pathname;
  const pathArray = pathname.split('/');
  // console.log(pathArray);

  // 普通の状態。project が設定されているのであれば何もしない。そのまま children を返す。
  if (project) return <>{children}</>;

  // 公開ディレクトリへのアクセス。url に 'local' が含まれていないのであれば、何もせずそのまま children を返す。
  if (pathArray[1] !== 'local' // not local
    || pathname === '/local/new-project' // not need to select a project
    // || pathname === '/local/home'
  ) return <>{children}</>;

  // ログインしていなければログインしてもらう
  if (!currentUser) return <TimeOut />;

  // url に 'local' が含まれている場合
  if (pathArray[1] === 'local') {
    // project が url に含まれている場合
    if (pathArray[2] === 'tags' || pathArray[2] === 'bydate') {
      setCurrentProject(pathArray[3]);
      return <>{children}</>;
    }
    if (pathArray.length > 3) {
      // ユーザーはログインしている前提なので url から project を設定する 
      setCurrentProject(pathArray[2]);
      return <>{children}</>;
    }
  }

  return (
    <Suspense fallback={<Spinner />}>
      <div className='info'><p className='red'>プロジェクト選択してください</p></div>
      <ProjectSelector refer={pathname} />
    </Suspense>
  );
}

export default DirectAccessFilter;

