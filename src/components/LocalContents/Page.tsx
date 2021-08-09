import {
  FC,
  useState,
  useEffect,
  Suspense,
  SuspenseList
} from 'react';
import { ImgSelectProvider } from 'contexts/imgSelectContext';
import { useQuery } from 'react-query';
import getContent from 'services/get-content';
// import postContent from 'services/post-content';
import getRelated from 'services/get-related';
import Main from './Main';
import Related from './Related';
import ResponseMessage from './ResponseMessage';
import {
  // Content,
  RelatedList
} from 'models/content';
import { Message } from 'models/message';
// import { useForceUpdate } from 'hooks/useForceUpdate';

const Page: FC<{ slug: string, project: string }> = ({ slug, project }) => {
  const [flg, setFlg] = useState<boolean>(false);
  const [error, setError] = useState<Error>();
  // const [d1, setD1] = useState<Content | undefined>(undefined);
  const [d2, setD2] = useState<RelatedList | undefined>(undefined);
  const [msg, setMsg] = useState<Message | undefined>(undefined);
  //

  const changeState = (arg: boolean) => {
    setFlg(arg);
  }
  // console.log("flg: ", flg);

  const setResMsg = (arg: Message) => {
    setMsg(arg);
  }

  useEffect(() => {
    setMsg(undefined)
  }, [slug]);

  useEffect(() => {
    let abortCtrl = new AbortController();
    const fetch = async () => {
      try {
        // const d1 = await getContent(slug);
        const d2 = await getRelated(project, slug);
        // setD1(d1);
        setD2(d2);

      } catch (e) {
        if (e.name !== 'AbortError') setError(e)
      }
    }
    if (slug || flg) {
      fetch();
    }
    return () => {
      setFlg(false);
      abortCtrl.abort();
    }
  }, [flg, slug, project, setD2]);


  const { data: d1 } = useQuery(['page', slug], () => getContent(project, slug));
  // const { data: d2 } = useQuery(['related', slug], () => getRelated(slug));

  if (error) return <div>{error.toString()}</div>

  return (
    <SuspenseList>
      <Suspense fallback={<div className="spinner"></div>}>
        <ImgSelectProvider>
          <Main data={d1} changeState={changeState} setResMsg={setResMsg} />
        </ImgSelectProvider>
      </Suspense>
      <Suspense fallback={<div className="spinner"></div>}>
        <ResponseMessage data={msg} />
      </Suspense>
      <Suspense fallback={<div className="spinner"></div>}>
        <Related data={d2} changeState={changeState} />
      </Suspense>
    </SuspenseList>
  );
}

export default Page;

