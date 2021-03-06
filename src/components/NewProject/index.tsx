import { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import createTable from 'services/create-table';
import PageTitle from 'components/Heading/PageTitle';

import { useHandleProject } from 'hooks/useHandleProject';
import { useResetData } from 'hooks/useResetData';

const NewProcject: FC = () => {
  console.log('render newproject');
  const [value, setValue] = useState('');
  const [projectName, setProjectName] = useState('');
  const [NG, setNG] = useState(false);

  const navigate = useNavigate();
  const { //addProject, 
    initProjects } = useHandleProject();

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log('scroll');
  }, [])

  const hasLowerCase = (str: string) => {
    str = (str == null) ? '' : str;
    return (/^[a-zA-z0-9_]+$/.test(str));
  }

  const resetData = useResetData();

  const submit = () => {
    if (hasLowerCase(value)) {
      (async () => {
        const msg = await createTable({ name: value });
        console.log(msg);
        if (msg.message === 'success') {
          initProjects();
          resetData();
          navigate('/local/home');
          // window.location.reload();
        } else {
          setNG(true);
          setProjectName(msg.message.slice(11));
        }
      })();
    } else {
      setNG(true);
      setProjectName('無効な文字が含まれています');
    }
  }

  return (
    <main>
      <PageTitle>新規プロジェクト作成</PageTitle>
      <p>新しいプロジェクト（カテゴリー？ ページ？）を作成します。</p>
      <input className='create-project-input' onChange={(e) => setValue(e.target.value)} type='text' />
      <button className='create-project-button' onClick={submit}>Create</button>
      <p>半角アルファベットと数字、_(アンダーバー)が使えます。</p>
      {NG ? <div className='red'>{projectName}</div> : ''}
    </main>
  );
}

export default NewProcject;

