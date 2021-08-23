import {
  FC,
  useRef,
  useState,
  useEffect,
  useCallback,
  Suspense,
} from 'react';
import { Helmet } from 'react-helmet-async';
import getRelatedOnly from 'services/get-related-only';
import { useProject } from 'hooks/useProject';
import Main from './Main';
import Related from './Related';
import { RelatedList } from 'models/content';
import Spinner from 'components/common/Spinner';
import ErrorBoundary from 'ErrorBoundary';

const NewPost: FC = () => {
  const [tags, setTags] = useState<string[]>([])
  const [error, setError] = useState<Error>();
  const [relatedData, setRelatedData] = useState<RelatedList | undefined>(undefined);
  const project = useProject();
  const ebKey = useRef(0);

  const setTagsState = useCallback((arg: string[]) => {
    setTags(arg);
  }, [setTags]);

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
    return () => {
      abortCtrl.abort();
    }
  }, [project, tags]);

  if (error) return <div>{error.toString()}</div>

  return (
    <ErrorBoundary key={`eb_1_${ebKey.current}`}>
      <Helmet>
        <title>Create New Content</title>
        <meta name='robots' content='noindex nofollow' />
      </Helmet>
      <Suspense fallback={<Spinner />}>
        <Main setTagsState={setTagsState} />
      </Suspense>
      <Suspense fallback={<Spinner />}>
        <Related data={relatedData} />
      </Suspense>
    </ErrorBoundary>
  );
}

export default NewPost;

