import {
  FC,
  memo,
  useState,
  useEffect,
  useCallback,
  Suspense,
  SuspenseList
} from 'react';
import { useQuery } from 'react-query';
import getContent from 'services/get-content';
import getRelated from 'services/get-related';
import getRelatedOnly from 'services/get-related-only';
import { RelatedList } from 'models/content';
import Main from './Main';
import Related from './Related';

const Page: FC<{ slug: string, project: string }> = memo(({ slug, project }) => {
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
    if (tags) {
      fetch();
    }
    return () => {
      abortCtrl.abort();
    }
  }, [project, tags, setTagsData]);

  const { data: mainData } = useQuery(['page', slug], () => getContent(project, slug));
  const { data: relatedData } = useQuery(['pre-tags', slug], () => getRelated(project, slug));

  if (error) return <div>{error.toString()}</div>

  return (
    <SuspenseList>
      <Suspense fallback={<div className="spinner"></div>}>
        <Main data={mainData} setTagsState={setTagsState} />
      </Suspense>
      <Suspense fallback={<div className="spinner"></div>}>
        <Related data={tags ? tagsData : relatedData} />
      </Suspense>
    </SuspenseList>
  );
});

export default Page;

