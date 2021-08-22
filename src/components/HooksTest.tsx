import { FC } from 'react'
import { useProject } from 'hooks/useProject';
import { useLoginUser } from 'hooks/useLoginUser';

const HooksTest: FC = () => {
  const project = useProject();
  const user = useLoginUser();
  console.log(project);

  return (
    <main>
      <p>こんにちは{user.displayName}さん。</p>
      <p>現在のプロジェクトは{project}です。</p>
    </main>
  );
}

export default HooksTest;

