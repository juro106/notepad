import {
  FC,
  memo,
  useState,
  useEffect,
  useCallback,
  useContext,
  Suspense,
  SuspenseList
} from 'react';
import getRelatedOnly from 'services/get-related-only';
import { ProjectContext } from 'contexts/projectContext';
import Main from './Main';
import Related from 'components/Related';
import { RelatedList } from 'models/content';

const Page: FC = memo(() => {
  const [tags, setTags] = useState<string[]>([])
  const [error, setError] = useState<Error>();
  const [relatedData, setRelatedData] = useState<RelatedList | undefined>(undefined);
  const { project } = useContext(ProjectContext);

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
    <>
      <SuspenseList>
        <Suspense fallback={<p>...loading</p>}>
          <Main setTagsState={setTagsState} />
        </Suspense>
        <Suspense fallback={<p>...loading</p>}>
          <Related data={relatedData} />
        </Suspense>
      </SuspenseList>
    </>
  );
});

export default Page;


