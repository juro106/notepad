import { Fragment, FC, Suspense, useState, useEffect, useCallback, memo } from 'react';
import { Link } from 'react-router-dom'
import { DateItem, Content } from 'models/content';
import { useQuery } from 'react-query';
import { queryClient } from 'index';
// import { useEmbedDateToArray } from 'hooks/useEmbedDateToArray';
import { useProject } from 'hooks/useProject';
import { useDateMap } from 'hooks/useDateMap';
import { useLayout } from 'hooks/useLayout';
import deleteContent from 'services/delete-content';
import getContentsAll from 'services/get-contents-all';
import TrashIcon from 'components/Button/TrashIcon';
import MiniToastWarning from 'components/Local/MiniToastWarning';
import ContentsListHeader from 'components/common/ContentsListHeader';
import LocalPageOuter from 'components/Local/LocalPageOuter';
import Visuallyhidden from 'components/Heading/Visuallyhidden';
import MonthHeading from 'components/Heading/MonthHeading';
import DayHeading from 'components/Heading/DayHeading';
import Spinner from 'components/common/Spinner';

const OrderByDate: FC = () => {
  const title = 'コンテンツ一覧（日付順）';
  const project = useProject();
  const { data } = useQuery(
    ['contents-all', project, { sort_by: 'created_at', order_by: 'DESC' }],
    () => getContentsAll(project, true, '?sort_by=created_at')
  );

  return (
    <LocalPageOuter title={title} suspense={true}>
      <main>
        <Visuallyhidden children={title} />
        <ContentsListHeader />
        <Suspense fallback={<Spinner />}>
          {data ? <ListFilter data={data} /> : <></>}
        </Suspense>
      </main>
    </LocalPageOuter>
  );
}


// type DayMap = Map<string, Content[]>;
type DayMap = { [key: string]: Content[] }
type MonthMap = Map<string, DayMap>

const ListFilter: FC<{ data: Content[] }> = memo(({ data }) => {
  const project = useProject();
  const DateMap = useDateMap(data, project);
  const queryKey = ['contents-all', project, { sort_by: 'created_at', order_by: 'DESC', embed: 'date' }]
  const oldArray = queryClient.getQueryData(queryKey);
  // キャッシュがなければ配列作成
  const memoArray = oldArray ? oldArray as MonthMap : DateMap();
  queryClient.setQueryData(queryKey, memoArray);

  const [list, setList] = useState<MonthMap>(memoArray);

  useEffect(() => {
    setList(memoArray);
  }, [memoArray])

  // console.log(memoArray);

  // console.log(param);
  // const deleteItem = useCallback(async (slug: string) => {
  //   console.log('deleteItem!!!!');
  //   setList(list.filter(item => item.slug !== slug));
  //   const msg = await deleteContent(project, slug);
  //   console.log(msg);
  // }, [list, setList, project]);
  if (list) {
    return <MonthItems list={list} />;
  }

  return <></>
  // return <List list={list} deleteItem={deleteItem} />
});

const MonthItems: FC<{ list: MonthMap, deleteItem?: (arg: string) => void }> = ({ list,
  // deleteItem
}) => {
  const { grid } = useLayout();

  return (
    <>
      {Array.from(list).map((v, k) => (
        <Fragment key={k}>
          <MonthHeading key={`month_heading_${v[0]}`} text={v[0]} />
          <DayList key={`month_list_${k}`} data={v[1]} />
        </Fragment>
      ))}
    </>
  );
}


const DayList: FC<{ data: DayMap }> = ({ data }) => {
  return (
    <>
      {Object.entries(data).map((v, k) =>
      (<Fragment key={k}>
        <DayHeading key={`day_heading_${k}`} text={v[0]} />
        <DateList key={`day_list_${k}`} list={v[1]} />
      </Fragment>
      ))}
    </>
  );
}


const DateList: FC<{ list: Content[], deleteItem?: (arg: string) => void }> = ({ list, deleteItem }) => {
  const { grid } = useLayout();
  if (list.length > 0) {
    return (
      <ul className={grid ? 'grid-list' : "edit-list"}>
        {list.map(v => (
          <ListItem key={v.slug} v={v}/>
        ))}
      </ul>
    )
  } else if (list.length === 0) {
    return (
      <div className='info-nocontent'>
        <p>メモがありません</p>
        <Link to='/home'>Homeへ戻る</Link>
      </div>
    );
  }

  return <></>
}

const ListItem: FC<{ v: Content }> = ({ v }) => {
  const { grid } = useLayout();
  const project = useProject();
  const { title, slug, created_at, tags, content } = v;
  const [isToast, setIsToast] = useState(false);
  const closeToast = () => {
    setIsToast(false);
  }

  if (tags && tags.length > 0) {
    return (
      <li className={grid ? 'grid-list-item' : 'edit-list-item'}>
        <Link to={`/local/${project}/${slug.trim()}`} className={grid ? 'grid-item-link' : "edit-item-link"}>
          <div className="item-title">{title}</div>
          <div className="item-dscr">
            {created_at ? `${created_at.slice(0, 10)}: ` : ''}
            {content.slice(0, 80)}
          </div>
        </Link>
      </li>
    );
  } 

  return <></>;
}

const List: FC<{ list: Content[], deleteItem: (arg: string) => void }> = ({ list, deleteItem }) => {
  const { grid } = useLayout();

  if (list.length > 0) {
    return (
      <ul className={grid ? 'grid-list' : "edit-list"}>
        {list.map(v => (
          <Item key={v.slug} v={v} deleteItem={deleteItem} />
        ))}
        <li className='splitter'></li>
      </ul>
    )
  } else if (list.length === 0) {
    return (
      <div className='info-nocontent'>
        <p>メモがありません</p>
        <Link to='/home'>Homeへ戻る</Link>
      </div>
    );
  }

  return <></>
}

const Item: FC<{ v: Content, deleteItem: (arg: string) => void }> = ({ v, deleteItem }) => {
  const { grid } = useLayout();
  const project = useProject();
  const { title, slug, created_at, tags, content } = v;
  const [isToast, setIsToast] = useState(false);
  const closeToast = () => {
    setIsToast(false);
  }

  if (tags && tags.length > 0) {
    return (
      <li key={`p_${slug}`} className={grid ? 'grid-list-item' : 'edit-list-item'}>
        <Link to={`/local/${project}/${slug.trim()}`} className={grid ? 'grid-item-link' : "edit-item-link"}>
          <div className="item-title">{title}</div>
          <div className="item-dscr">
            {created_at ? `${created_at.slice(0, 10)}: ` : ''}
            {content.slice(0, 80)}
          </div>
        </Link>
        {isToast && <MiniToastWarning slug={slug} closeToast={closeToast} deleteFunc={deleteItem} />}
        <div className={isToast ? 'hidden' : grid ? 'delete-button-grid' : 'delete-button'} onClick={() => setIsToast(true)}>
          <TrashIcon />
        </div>
      </li>
    );
  } else if (content === 'date') {
    return <li className='bydate'><h2>{title}</h2></li>
  }

  return <></>;
}

export default OrderByDate;

