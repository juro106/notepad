import {
  FC,
  useState,
  useEffect,
  useContext,
  Suspense,
  SuspenseList
} from 'react';
import getRelatedOnly from 'services/get-related-only';
import { AuthContext } from 'contexts/authContext';
import Main from './Main';
import Related from 'components/Related';
import { RelatedList } from 'models/content';

const NewPost: FC = () => {
  const [tags, setTags] = useState<string[]>([])
  const { uid } = useContext(AuthContext);
  const [error, setError] = useState<Error>();
  const [d2, setD2] = useState<RelatedList | undefined>(undefined);

  const setTagsState = (arg: string[]) => {
    setTags(arg);
  }

  useEffect(() => {
    let abortCtrl = new AbortController();
    const fetch = async () => {
      try {
        const d2 = await getRelatedOnly({uid, tags});
        setD2(d2);
      } catch (e) {
        if (e.name !== 'AbortError') setError(e)
      }
    }
    fetch();
    return () => {
      abortCtrl.abort();
    }
  }, [uid, tags]);

  if (error) return <div>{error.toString()}</div>

  return (
    <SuspenseList>
      <Suspense fallback={<p>...loading</p>}>
        <Main setTagsState={setTagsState} />
      </Suspense>
      <Suspense fallback={<p>...loading</p>}>
        <Related data={d2} />
      </Suspense>
    </SuspenseList>
  );
}

export default NewPost;

