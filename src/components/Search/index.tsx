import { FC, useState, useEffect, useContext, Suspense, useRef } from 'react';
import { ProjectContext } from 'contexts/projectContext';
import { useQuery } from 'react-query';
import { Content } from 'models/content';
import getContentsAll from 'services/get-contents-all';
import { Link, useNavigate } from 'react-router-dom';
import ErrorBoundary from 'ErrorBoundary';
import { FiSearch } from 'react-icons/fi';
import { AiFillCloseCircle } from 'react-icons/ai';

const Search: FC<{ project: string, isLoggedIn: boolean }> = ({ project, isLoggedIn }) => {
  // 入力キーワード
  const [keyword, setKeyword] = useState<string>('');
  // 検索するかどうか
  const [focus, setFocus] = useState<boolean>(false);
  const ebKey = useRef(0);

  const navigate = useNavigate();

  const reset = (path?: string) => {
    path && navigate(path);
    setFocus(false);
    setKeyword('');
    // setFocus(false);
  }

  const KeyBinding = (e: React.KeyboardEvent) => {
    if (e.code === 'Esc') {
      reset();
    }
  }

  if (project) {
    return (
      <>
        <div id="search-input-outer" tabIndex={0}>
          <input
            id='search-input'
            onFocus={() => setFocus(true)}
            onKeyDown={(e) => KeyBinding(e)}
            type='text' value={keyword}
            onChange={e => setKeyword(e.target.value)}
            placeholder='Search...'
          />
          <FiSearch size={28} color={'#888'} />
        </div>
        <ErrorBoundary key={`eb_1_${ebKey.current}`}>
          <Suspense fallback={<div className="spinner"></div>}>
            <SearchDataFetch project={project} focus={focus} keyword={keyword} reset={reset} isLoggedIn={isLoggedIn} />
          </Suspense>
        </ErrorBoundary>
      </>
    );
  }

  return <></>
}

const SearchDataFetch: FC<{ project: string; focus: boolean; keyword: string; reset: (arg?: string) => void, isLoggedIn: boolean }> = ({ project, focus, keyword, reset, isLoggedIn }) => {
  // const ctx = useProjectContext();
  const pub = !isLoggedIn;
  const { data } = useQuery(['search'], () => getContentsAll(project, pub))

  if (data && focus) {
    return (
      <SearchData data={data} focus={focus} keyword={keyword} reset={reset} />
    );
  }

  return <></>
}

const SearchData: FC<{ data: Content[]; focus: boolean; keyword: string; reset: (arg?: string) => void }> = ({ data, focus, keyword, reset }) => {
  // リストを表示するかどうか
  const [showList, setShowList] = useState<boolean>(false);
  // フィルター
  const [filteredData, setFilteredData] = useState<Content[]>(data);

  // keywordが変わる度に検索してフィルターにかける
  useEffect(() => {
    // console.log('useEffect!!');
    let isMounted = true;
    if (isMounted) {

      if (!focus) {
        setFilteredData(filteredData);
        reset();
        return;
      }

      // if (keyword === '') {
      //   setFilteredData(data);
      // }

      const searchKeywords = keyword.trim().toLowerCase().match(/[^\s]+/g);
      const isTrue = (arg: string[] | undefined) => {
        if (arg && arg.length > 0) return true;
      }

      const filteredList = data.filter(v =>
        searchKeywords && searchKeywords.every((kw) => (
          isTrue((v.tags && v.tags.filter(z => z.toLowerCase().indexOf(kw) !== -1)))
          || v.title.toLowerCase().indexOf(kw) !== -1
          || v.content.toLowerCase().indexOf(kw) !== -1
        )))
      setFilteredData(filteredList);

      if (filteredData.length > 0) {
        setShowList(true);
      }
    }
    return () => {
      isMounted = false;
    }
    // setShowList(false);
  }, [reset, focus, keyword, data, filteredData])

  const closeResults = () => {
    setShowList(false);
  }

  // フィルターをかけた後の加工が重要。
  // そのまま表示させるだけだと不十分、というか寂しい
  // console.log('keyword -->', keyword);
  if (focus) {
    return (
      <div id='modal-search-results-outer' onClick={() => reset()}>
        {filteredData.length > 0 && <Results keyword={keyword} data={filteredData} show={showList} closeResults={closeResults} reset={reset} />}
      </div>
    );
  }

  return <></>;
}


// <Link className='tag-link' to={`/local/${project}/${tag}`}>{tag}</Link>

const Results: FC<{ keyword: string, data: Content[] | undefined, show: boolean, closeResults: () => void; reset: (arg?: string) => void }> = ({ keyword, data, show, closeResults, reset }) => {
  const { project } = useContext(ProjectContext);
  // onClick={() => goPage(`/local/${project}/${v.slug}`)}
  // console.log('results', data);
  if (data && show) {
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
                to={`/local/${project}/${v.slug}`}
                onClick={() => reset(`/local/${project}/${v.slug}`)}
              >
                <div className='item-title'><MatchTitle keyword={keyword} title={v.title} /></div>
                {v.tags && v.tags.length > 0 ?
                  <ul className="tag-list">
                    {v.tags.map((tag, tkey) => (
                      <li key={`tag_${tkey}`} className="tag-item"><MatchTag keyword={keyword} tag={tag} /></li>
                    ))}
                  </ul>
                  : ''}
                <div className='item-dscr'><MatchContent keyword={keyword} content={v.content} /></div>
              </Link>
            </li>
          ))}
        </ul>
      </div >
    );
  }

  return <></>;
}

const MatchTitle: FC<{ keyword: string, title: string }> = ({ keyword, title }) => {
  const newItem = title.replace(keyword, `:${keyword}:`);
  const textArray = newItem.split(':');

  return (
    <>
      {textArray.map((str, key) => {
        if (str.toLowerCase() === keyword.toLowerCase()) {
          return <span key={`match_title_${key}`} className='match'>{str}</span>;
        }
        return str;
      })}
    </>
  );
}

const MatchTag: FC<{ keyword: string, tag: string }> = ({ keyword, tag }) => {
  const newItem = tag.replace(keyword, `:${keyword}:`);
  const textArray = newItem.split(':');

  return (
    <>
      {textArray.map((str, key) => {
        if (str.toLowerCase() === keyword.toLowerCase()) {
          return <span key={`match_tag_${key}`} className='match'>{str}</span>;
        }
        return str;
      })}
    </>
  );
}

const MatchContent: FC<{ keyword: string, content: string }> = ({ keyword, content }) => {
  const newItem = content.replace(keyword, `:${keyword}:`);
  const textArray = newItem.split(':');

  return (
    <>
      {textArray.map((str, key) => {
        if (str.toLowerCase() === keyword.toLowerCase()) {
          return <span key={`match_content_${key}`} className='match'>{str}</span>;
        }
        return str;
      })}
    </>
  );
}

export default Search;

