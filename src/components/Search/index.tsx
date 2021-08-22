import { FC, memo, useState, useCallback, useRef, Suspense } from 'react';
import { Content, isContentsList } from 'models/content';
import getContentsAll from 'services/get-contents-all';
import { Link } from 'react-router-dom';
import ErrorBoundary from 'ErrorBoundary';
import { FiSearch } from 'react-icons/fi';
import { AiFillCloseCircle } from 'react-icons/ai';

import {getDataFromQuery} from 'services/getDataFromQuery';

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
    // setData(undefined);
    setFocus(false);
  }, [setQuery, setFocus, setResource]);
  // },[navigate]);
  const resetf = useCallback(() => {
    if (query === '') { // 0文字だったらフォーカスを外したときに検索をキャンセル
      setFocus(false);
      setResource(undefined);
      // setData(undefined);
    }
  }, [query, setFocus]);

  const fetchData = useCallback(async () => {
    if (!data) {
      const cacheData = await getDataFromQuery(['contents-all', project]) as unknown[]
      if (cacheData) {
        console.log('cache!!!');
        isContentsList(cacheData) && setData(cacheData);
      } else {
        console.log('fetch!!!');
        const fetchedData = await getContentsAll(project, !isLoggedIn);
        setData(fetchedData);
      }
    }
  }, [data, setData, project, isLoggedIn]);

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
        || v.created_at.slice(0, 10).toLowerCase().indexOf(kw) !== -1
        || (v.updated_at && v.updated_at.slice(0, 10).toLowerCase().indexOf(kw) !== -1)
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
      <SearchInput
        query={query}
        handleFocus={handleFocus}
        resetf={resetf}
        handleChange={handleChange}
      />
      <ErrorBoundary key={`eb_1_${ebKey.current}`}>
        <Suspense fallback={<></>}>
          {focus &&
            <ResultsOuter
              focus={focus}
              data={resource}
              query={query}
              reset={reset}
              isLoggedIn={isLoggedIn}
            />}
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

interface InputProps {
  query: string,
  handleFocus: (e: React.FocusEvent<HTMLInputElement>) => void,
  resetf: () => void,
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

const SearchInput: FC<InputProps> = memo(({ query, handleFocus, resetf, handleChange, }) => {
  return (
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
      <SearchIcon />
    </div>
  );
});

const SearchIcon: FC = memo(() => <FiSearch size={28} color={'#888'} />);

type ResultsProps = {
  focus?: boolean;
  data: Content[] | undefined;
  query: string;
  reset: (arg?: string) => void;
  isLoggedIn: boolean;
}

const ResultsOuter: FC<ResultsProps> = memo(({ focus, data, query, reset, isLoggedIn }) => {
  if (focus) {
    return (
      <div id='modal-search-results-outer' onClick={() => reset()}>
        {data &&
          <ResultsInner
            data={data}
            query={query}
            reset={reset}
            isLoggedIn={isLoggedIn}
          />}
      </div>
    );
  }
  return <></>;
});

const ResultsInner: FC<ResultsProps> = memo(({ data, query, reset, isLoggedIn }) => {
  if (data) {
    return (
      <div id='modal-search-results-inner'>
        <header className="search-results-header">
          <h2>Search results {data.length}</h2>
          <CloseCircle />
        </header>
        <ul className='item-list'>
          {data.map(v => (
            <ListItem
              key={v.slug}
              v={v}
              query={query}
              reset={reset}
              isLoggedIn={isLoggedIn}
            />
          ))}
        </ul>
      </div >
    );
  }

  return <></>;
});

const CloseCircle: FC = memo(() =>
  <div className="button-close-search-results">
    <AiFillCloseCircle size={30} color={'#f00'} />
  </div>
);

type ItemProps = {
  v: Content;
  query: string;
  reset: () => void;
  isLoggedIn: boolean
}

const ListItem: FC<ItemProps> = memo(({ v, query, isLoggedIn, reset }) => {
  return (
    <li className="results-item">
      <Link
        className='item-link'
        to={isLoggedIn ? `/local/${v.project}/${v.slug}` : `/${v.slug}`}
        onClick={() => reset()}
      >
        <div className='item-title'><MatchItem query={query} str={v.title} /></div>
        <div className='item-time'>
          <MatchItem query={query} str={v.created_at.slice(0, 10)} />
            {v.updated_at && <> (↺ <MatchItem query={query} str={v.updated_at.slice(0, 10)} />)</>}
        </div>
        {v.tags && v.tags.length > 0 ?
          <ul className="tag-list">
            {v.tags.map((tag, tkey) => (
              <li key={`tag_${tkey}`} className="tag-item"><MatchItem query={query} str={tag} /></li>
            ))}
          </ul>
          : ''}
        {/*v.tags && <div className="tag-item"><MatchItem query={query} str={v.tags.join(' ')} />{}</div>*/}
        <div className='item-dscr'><MatchContent query={query} str={v.content} /></div>
      </Link>
    </li>
  );
});

const MatchItem: FC<{ query: string, str: string }> = memo(({ query, str }) => {
  const tmpArray = str.split(query);
  const before = tmpArray[0]
  const after = tmpArray.slice(1).join(query)

  if (tmpArray.length > 1) {
    return <>{before}<span className='match'>{query}</span>{after}</>;
  }

  return <>{str}</>;
});

const MatchContent: FC<{ query: string, str: string }> = memo(({ query, str }) => {
  const tmpArray = str.split(query);
  const before = tmpArray[0].slice(-30);
  const after = tmpArray.slice(1).join(query).slice(0, 100);

  if (tmpArray.length > 1) {
    return <>{before}<span className='match'>{query}</span>{after}</>;
  }

  return <>{str.slice(0, 100)}</>;
});

export default Search;

