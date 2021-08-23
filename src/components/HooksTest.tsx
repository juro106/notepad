import { FC } from 'react'
import { useProject } from 'hooks/useProject';

const HooksTest: FC = () => {
  const project = useProject();
  console.log(project);

  return (
    <main>
      <p>現在のプロジェクトは{project}です。</p>
    </main>
  );
}

export default HooksTest;

