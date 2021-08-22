import {
  FC,
  memo,
  useState,
  useEffect,
  useCallback,
  Suspense,
  // SuspenseList
} from 'react';
import { useQuery, 
  // useMutation
} from 'react-query';
import getContent from 'services/get-content';
import getRelated from 'services/get-related';
import getRelatedOnly from 'services/get-related-only';
import { RelatedList } from 'models/content';
import Main from './Main';
import Related from './Related';
import Spinner from 'components/common/Spinner';

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
    if (tags) fetch();

    return () => abortCtrl.abort();
  }, [project, tags, setTagsData]);

  const { data: mainData } = useQuery(['page', project, slug], () => getContent(project, slug, true));
  const { data: relatedData } = useQuery(['tags', project, slug], () => getRelated(project, slug, true));

  if (error) return <div>{error.toString()}</div>

  if (mainData) {
    return (
      <>
        <Suspense fallback={<Spinner />}>
          <Main data={mainData} setTagsState={setTagsState} />
        </Suspense>
        <Suspense fallback={<Spinner />}>
          <Related data={tags ? tagsData : relatedData} project={project} />
        </Suspense>
      </>
    );
  }

  return <></>;
});

export default Page;

