import {
  FC,
  useState,
  useEffect,
  useContext,
  Suspense,
  SuspenseList
} from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import getRelatedOnly from 'services/get-related-only';
import { AuthContext } from 'contexts/authContext';
import Main from './Main';
import Related from 'components/Related';
import { RelatedList } from 'models/content';

const NewPost: FC = () => {
  const [tags, setTags] = useState<string[]>([])
  const { token, uid } = useContext(AuthContext);
  const [error, setError] = useState<Error>();
  const [d2, setD2] = useState<RelatedList | undefined>(undefined);

  const setTagsState = (arg: string[]) => {
    setTags(arg);
  }
  const idToken = token;
  // const idToken = 'hoge';

  useEffect(() => {
    let abortCtrl = new AbortController();
    const fetch = async (v: string) => {
        try {
          const d2 = await getRelatedOnly({ uid, tags }, { Authorization: v });
          setD2(d2);
        } catch (e) {
          if (e.name !== 'AbortError') setError(e)
        }
      }
    if (idToken) {
      const v = String(idToken);
    fetch(v);
    }
    return () => {
      abortCtrl.abort();
    }
  }, [uid, tags, idToken]);

  if (error) return <div>{error.toString()}</div>

  return (
    <SuspenseList>
      <HelmetProvider>
        <Helmet>
          {uid ? <meta name='robots' content='noindex nofollow' /> : ''}
        </Helmet>
      </HelmetProvider>
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

