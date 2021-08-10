import { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import createTable from 'services/create-table';

const NewProcject: FC = () => {
  const [value, setValue] = useState('');
  const [projectName, setProjectName] = useState('');
  const [NG, setNG] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log('scroll');
  }, [])

  const hasLowerCase = (str: string) => {
    str = (str == null) ? '' : str;
    return (/^[a-z0-9_-]+$/.test(str));
  }

  const submit = () => {
    if (hasLowerCase(value)) {
      (async () => {
        const msg = await createTable({ name: value });
        console.log(msg);
        if (msg.message === 'success') {
          navigate('/home');
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
      <h1>新規プロジェクト作成</h1>
      <p>新しいプロジェクト（カテゴリー？ ページ？）を作成します。</p>
      <input className='create-project-input' onChange={(e) => setValue(e.target.value)} type='text' />
      <button className='create-project-button' onClick={submit}>Create</button>
        <p>半角アルファベット小文字と半角数字、-(ハイフン)と_(アンダーバー)が使えます。</p>
      {NG ? <div className='red'>{projectName}</div> : ''}
    </main>
  );
}

export default NewProcject;

