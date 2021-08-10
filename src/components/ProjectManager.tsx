import {
  FC,
  useState,
  useEffect,
  Suspense,
} from 'react';
import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router';
// import { useQuery } from 'react-query';
import getProjects from 'services/get-projects';
import deleteProject from 'services/delete-project';
import { useProjectContext } from 'contexts/projectContext';
import { useCloseModal } from 'hooks/useCloseModal';
import Overlay from 'components/Overlay';
import ModalContents from 'components/ModalContents';

const ProjectManager: FC = () => {
  return (
    <Suspense fallback={<div className="spinner"></div>}>
      <Contents />
    </Suspense>
  )
}

const Contents: FC = () => {
  const [flg, setFlg] = useState<boolean>(false);
  const [data, setData] = useState<string[] | undefined>(undefined);
  // const { data } = useQuery(['projects'], () => getProjects());
  // 初回
  useEffect(() => {
    const fetch = async () => {
      const res = await getProjects();
      setData(res);
    }
    fetch();
    window.scrollTo(0, 0);
  }, []);
  // 2回目以降。変更があったとき
  useEffect(() => {
    if (flg) {
      const fetch = async () => {
        const res = await getProjects();
        setData(res);
      }
      fetch();
    }
    return () => {
      setFlg(false)
    }
  }, [flg]);

  const changeState = (arg: boolean) => {
    setFlg(arg);
  }

  return (
    <div className='projects-block'>
      <h1>プロジェクト管理</h1>
      <p>プロジェクトの作成、削除を行います</p>
      <Link to='/newproject'>＋ 新規プロジェクト作成</Link>
      <h2 className='project-manager-h2'>プロジェクト一覧</h2>
      <Suspense fallback={<div className="spinner"></div>}>
        <List data={data} changeState={changeState} />
      </Suspense>
    </div>
  );
}

const List: FC<{ data: string[] | undefined, changeState: (arg: boolean) => void }> = ({ data, changeState }) => {
  const ctx = useProjectContext();
  // const navigate = useNavigate();
  const [projectName, setProjectName] = useState<string>('');
  const [toastOn, setToastOn] = useState(false);

  const showToastWarning = (arg: string) => {
    setToastOn(true);
    setProjectName(arg)
  }
  const toastClose = () => {
    setToastOn(false);
  }

  const handleClick = (arg: string) => {
    ctx.setCurrentProject(arg); // Context(現在のProject)の値を更新
    changeState && changeState(true); // flg=ture <-再読込 & setIsEmptyProject=false <-自明なので問答無用で処理
  }

  if (data) {
    return (
      <>
        <ul className='project-list'>
          {data.map((v, k) => (
            <li className='project-item' key={k}>
              <Link className='project-link' onClick={() => handleClick(v)} to={`/local/${v}/`}>{v}</Link>
              <div className='button-delete-project'>
                <div className="delete-button" onClick={() => showToastWarning(v)}>
                  ☓ delete
                </div>
              </div>
            </li>
          ))}
        </ul>
        <ToastWarning
          projectName={projectName}
          toastOn={toastOn}
          changeState={changeState}
          toastClose={toastClose}
        />
      </>
    );
  }
  return <div>プロジェクトがありません</div>
}

const ToastWarning: FC<{
  projectName: string,
  toastOn: boolean,
  changeState: (arg: boolean) => void
  toastClose: () => void
}> = ({
  projectName,
  toastOn,
  changeState,
  toastClose,
}) => {
    const { elementRef, closeModal } = useCloseModal(toastClose);

    const handleDelete = async (arg: string) => {
      const res = await deleteProject(arg);
      console.log(res);
      toastClose();
      changeState(true); // 処理が終わったら再描写させる
    }

    if (toastOn) {
      return (
        <Overlay id='modal-wrapper' onClose={closeModal}>
          <ModalContents id='modal-inner-toast-warning' elRef={elementRef}>
            <div className="toast-warning-box">
              <div className="toast-warning-message">
                <p><b>「{projectName}」を本当に削除しますか？</b></p>
                <p>※プロジェクト内のすべてのコンテンツが消去されます。</p>
              </div>
              <div className="select-box">
                <div className="button-yes" onClick={() => handleDelete(projectName)}>☓ delete</div>
                <div className="button-no" onClick={() => toastClose()}>cancel</div>
              </div>
            </div>
          </ModalContents>
        </Overlay>
      );
    }

    return <></>;
  }
export default ProjectManager;


