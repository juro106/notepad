import { Fragment, FC, Suspense, useState, useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import { Content, DayMap, MonthMap } from 'models/content';
import { queryClient } from 'index';
import { useProject } from 'hooks/useProject';
import { useDateMap } from 'hooks/useDateMap';
import { useLayout } from 'hooks/useLayout';
import { useFetchByDate } from 'hooks/useFetchByDate';
import ContentsListHeader from 'components/common/ContentsListHeader';
import LocalPageOuter from 'components/Local/LocalPageOuter';
import Visuallyhidden from 'components/Heading/Visuallyhidden';
import MonthHeading from 'components/Heading/MonthHeading';
import DayHeading from 'components/Heading/DayHeading';
import Spinner from 'components/common/Spinner';

const OrderByDate: FC = () => {
  const title = 'コンテンツ一覧（日付順）';
  const data = useFetchByDate();

  return (
    <LocalPageOuter title={title} suspense={true}>
      <main>
        <Visuallyhidden children={title} />
        <ContentsListHeader />
        <Suspense fallback={<Spinner />}>
          {data && <ListFilter data={data} />}
        </Suspense>
      </main>
    </LocalPageOuter>
  );
}

const ListFilter: FC<{ data: Content[] }> = memo(({ data }) => {
  const project = useProject();
  const DateMap = useDateMap(data, project);
  const queryKey = ['contents-all-use-type-Map', project, { sort_by: 'created_at', order_by: 'DESC', embed: 'date' }]
  const oldArray = queryClient.getQueryData(queryKey);
  // キャッシュがなければ配列作成
  const memoArray = oldArray ? oldArray as MonthMap : DateMap();
  queryClient.setQueryData(queryKey, memoArray);

  const [list, setList] = useState<MonthMap>(memoArray);

  useEffect(() => {
    setList(memoArray);
  }, [memoArray])

  if (list) {
    return (
      <Suspense fallback={<Spinner />}>
        <MonthItems list={list} />
      </Suspense>
    )
  }

  return <></>;
  // return <List list={list} deleteItem={deleteItem} />
});

const MonthItems: FC<{ list: MonthMap }> = ({ list }) => {
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
          <ListItem key={v.slug} v={v} />
        ))}
      </ul>
    );
  } else if (list.length === 0) {
    return (
      <div className='info-nocontent'>
        <p>メモがありません</p>
        <Link to='/home'>Homeへ戻る</Link>
      </div>
    );
  }

  return <></>;
}

const ListItem: FC<{ v: Content }> = ({ v }) => {
  const { grid } = useLayout();
  const project = useProject();
  const { title, slug, created_at, tags, content } = v;
  // const [isToast, setIsToast] = useState(false);
  // const closeToast = () => {
  //   setIsToast(false);
  // }

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

export default OrderByDate;

