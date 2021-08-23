import {
  FC, memo, useRef, useContext, Suspense,
  useState,
  useCallback,
  useEffect,
} from 'react';
import { useParams } from 'react-router';
import ErrorBoundary from 'ErrorBoundary';
import { AuthContext } from 'contexts/authContext';
import { useProject } from 'hooks/useProject';
import TimeOut from 'components/Local/TimeOut';
import { useQuery } from 'react-query';
import getContent from 'services/get-content';
import getRelated from 'services/get-related';
import getRelatedOnly from 'services/get-related-only';
import { RelatedList } from 'models/content';
import Main from './Main';
import Related from './Related';
import Spinner from 'components/common/Spinner';

const MainContents: FC = memo(() => {
  const { slug, projectName } = useParams();
  const { currentUser } = useContext(AuthContext);
  const project = useProject();
  // const  setCurrentProject  = useSetProject();
  const ebKey = useRef(0);

  const [tags, setTags] = useState<string[] | undefined>(undefined);
  const [error, setError] = useState<Error>();
  const [tagsData, setTagsData] = useState<RelatedList | undefined>(undefined);

  const setTagsState = useCallback((arg: string[]) => {
    setTags(arg);
  }, [setTags]);

  useEffect(() => {
    let abortCtrl = new AbortController();
    const fetch = async () => {
      try {
        const response = tags && await getRelatedOnly({ project, tags });
        setTagsData(response);
      } catch (e) {
        if (e.name !== 'AbortError') setError(e)
      }
    }
    if (tags) fetch();

    return () => abortCtrl.abort();
  }, [project, tags, setTagsData]);

  const { data: mainData } = useQuery(['page', project, slug], () => getContent(project, slug, true));
  const { data: relatedData } = useQuery(['tags', project, slug], () => getRelated(project, slug, true));

  if (error) return <div>{error.toString()}</div>

  if (mainData && currentUser && slug && projectName) {
    return (
      <ErrorBoundary key={`eb_1_${ebKey.current}`}>
        <Suspense fallback={<Spinner />}>
          <Main data={mainData} setTagsState={setTagsState} />
        </Suspense>
        <Suspense fallback={<Spinner />}>
          <Related data={tags ? tagsData : relatedData} project={project} />
        </Suspense>
      </ErrorBoundary>
    );
  }

  return <TimeOut />
});

export default MainContents;

