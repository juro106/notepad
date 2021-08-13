import {
  FC,
  useState,
  useEffect,
  useContext,
  Suspense,
  SuspenseList
} from 'react';
import { ImgSelectProvider } from 'contexts/imgSelectContext';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import getRelatedOnly from 'services/get-related-only';
import { AuthContext } from 'contexts/authContext';
import { ProjectContext } from 'contexts/projectContext';
import Main from './Main';
import Related from 'components/Related';
import { RelatedList } from 'models/content';
import Projcets from 'components/UserHome/Projects';

const NewPost: FC = () => {
  const [load, setLoad] = useState<boolean>(false);
  const [tags, setTags] = useState<string[]>([])
  const [isEmptyProject, setIsEmptyProject] = useState<boolean>(false);
  const [error, setError] = useState<Error>();
  const [relatedData, setRelatedData] = useState<RelatedList | undefined>(undefined);
  const { currentUser } = useContext(AuthContext);
  const { project } = useContext(ProjectContext);

  const setTagsState = (arg: string[]) => {
    setTags(arg);
  }

  const changeState = (arg: boolean) => {
    setIsEmptyProject(false);
  }

  useEffect(() => {
    let abortCtrl = new AbortController();
    const fetch = async () => {
      try {
        const response = await getRelatedOnly({ project, tags });
        setRelatedData(response);
      } catch (e) {
        if (e.name !== 'AbortError') setError(e)
      }
    }
    fetch();
    project === '' && setIsEmptyProject(true);
    setLoad(true);
    return () => {
      abortCtrl.abort();
    }
  }, [project, tags, isEmptyProject]);

  if (error) return <div>{error.toString()}</div>

  if (currentUser) {
    return (
      <HelmetProvider>
        <Helmet>
          {load &&
            <>
              <title>Create New Contents</title>
              <meta name='robots' content='noindex nofollow' />
            </>
          }
        </Helmet>
        <SuspenseList>
          <Suspense fallback={<p>...loading</p>}>
            {isEmptyProject
              ? <>
                <div className='info'><p className='red'>プロジェクト選択してください</p></div>
                <Projcets refer={'new'} changeState={changeState} />
              </>
              :
              <ImgSelectProvider>
                <Main setTagsState={setTagsState} />
              </ImgSelectProvider>
            }
          </Suspense>
          <Suspense fallback={<p>...loading</p>}>
            <Related data={relatedData} />
          </Suspense>
        </SuspenseList>
      </HelmetProvider>
    );
  }

  return <></>
}

export default NewPost;

