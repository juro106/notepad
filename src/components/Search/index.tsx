import { FC, useState, useCallback, useRef, Suspense } from 'react';
import { Content } from 'models/content';
import getContentsAll from 'services/get-contents-all';
import { Link } from 'react-router-dom';
import ErrorBoundary from 'ErrorBoundary';
import { FiSearch } from 'react-icons/fi';
import { AiFillCloseCircle } from 'react-icons/ai';

/* 
 * 暗い: (focus: true)
 * 暗い ＆ 結果なし: (focus: true, resource: false)
 * 暗い ＆ 結果あり: (focus: true, resource: true)
 * ResultsOuter: foucus(self), resetFunc(for ChildComponent)
 * ResultsInner: resetFunc,
 */

const Search: FC<{ project: string, isLoggedIn: boolean }> = ({ project, isLoggedIn }) => {
  const ebKey = useRef(0);
  const [query, setQuery] = useState<string>('');
  const [focus, setFocus] = useState<boolean>(false);
  // 元になるデータ
  const [data, setData] = useState<Content[] | undefined>(undefined);
  // 検索結果に使う resource
  const [resource, setResource] = useState<Content[] | undefined>(undefined);

  const reset = useCallback((path?: string) => {
    setQuery('');
    setResource(undefined);
    setData(undefined);
    setFocus(false);
  }, [setQuery, setFocus, setResource, setData]);
  // },[navigate]);
  const resetf = useCallback(() => {
    if (query === '') { // 0文字だったらフォーカスを外したときに検索をキャンセル
      setFocus(false);
      setResource(undefined);
      setData(undefined);
    }
  }, [query, setFocus]);

  const fetchData = useCallback(async () => {
    if (!data) {
      // console.log('fetch!!!');
      const res = await getContentsAll(project, !isLoggedIn);
      setData(res);
    }
  }, [data, project, isLoggedIn, setData]);

  const searchQuery = useCallback((query: string, data: Content[]) => {
    const formattedQuery = query.trim().toLowerCase().match(/[^\s]+/g);
    const isTrue = (arg: string[] | undefined) => {
      if (arg && arg.length > 0) return true;
    }

    const filteredList = data.filter(v =>
      formattedQuery && formattedQuery.every((kw) => (
        isTrue((v.tags && v.tags.filter(z => z.toLowerCase().indexOf(kw) !== -1)))
        || v.title.toLowerCase().indexOf(kw) !== -1
        || v.content.toLowerCase().indexOf(kw) !== -1
      )));

    setResource(filteredList);
  }, [setResource]);

  const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    !data && fetchData();
    setFocus(true);
  }, [data, fetchData, setFocus]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    data && searchQuery(value, data);
  }, [data, setQuery, searchQuery]);

  return (
    <>
      <div id="search-input-outer" tabIndex={0}>
        <input
          id='search-input'
          type='text'
          value={query}
          onFocus={(e) => handleFocus(e)}
          onBlur={() => resetf()}
          onChange={(e) => handleChange(e)}
          placeholder='Search...'
        />
        <FiSearch size={28} color={'#888'} />
      </div>
      <ErrorBoundary key={`eb_1_${ebKey.current}`}>
        <Suspense fallback={<></>}>
          {focus &&
            <ResultsOuter
              focus={focus}
              data={resource}
              project={project}
              query={query}
              reset={reset}
              isLoggedIn={isLoggedIn}
            />}
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

type ResultsProps = {
  focus?: boolean;
  data: Content[] | undefined;
  project: string;
  query: string;
  reset: (arg?: string) => void;
  isLoggedIn: boolean;
}

const ResultsOuter: FC<ResultsProps> = ({ focus, data, project, query, reset, isLoggedIn }) => {
  if (focus) {
    return (
      <div id='modal-search-results-outer' onClick={() => reset()}>
        {data &&
          <ResultsInner
            data={data}
            project={project}
            query={query}
            reset={reset}
            isLoggedIn={isLoggedIn}
          />}
      </div>
    );
  }
  return <></>;
}

const ResultsInner: FC<ResultsProps> = ({ data, project, query, reset, isLoggedIn }) => {
  if (data) {
    return (
      <div id='modal-search-results-inner'>
        <header className="search-results-header">
          <h2>Search results {data.length}</h2>
          <div className="button-close-search-results">
            <AiFillCloseCircle size={30} color={'#f00'} />
          </div>
        </header>
        <ul className='item-list'>
          {data.map((v, key) => (
            <li className="results-item" key={`results_${key}`}>
              <Link
                className='item-link'
                to={isLoggedIn ? `/local/${project}/${v.slug}` : `/${v.slug}`}
                onClick={() => reset()}
              >
                <div className='item-title'><MatchFunc query={query} str={v.title} /></div>
                {v.tags && v.tags.length > 0 ?
                  <ul className="tag-list">
                    {v.tags.map((tag, tkey) => (
                      <li key={`tag_${tkey}`} className="tag-item"><MatchFunc query={query} str={tag} /></li>
                    ))}
                  </ul>
                  : ''}
                <div className='item-dscr'><MatchContent query={query} str={v.content} /></div>
              </Link>
            </li>
          ))}
        </ul>
      </div >
    );
  }

  return <></>;
}


const MatchFunc: FC<{ query: string, str: string }> = ({ query, str }) => {
  const tmpArray = str.split(query);

  if (tmpArray.length > 1) {
    return <>{tmpArray[0]}<span className='match'>{query}</span>{tmpArray[1]}</>;
  }

  return <>{str}</>;
}

const MatchContent: FC<{ query: string, str: string }> = ({ query, str }) => {
  const tmpArray = str.split(query);
  const before = tmpArray[0].slice(-30);
  const after = tmpArray.slice(1).join(query).slice(0, 100);

  if (tmpArray.length > 1) {
    return <>{before}<span className='match'>{query}</span>{after}</>;
  }

  return <>{str.slice(0, 100)}</>;
}

export default Search;

