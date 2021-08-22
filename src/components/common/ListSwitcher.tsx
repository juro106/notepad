import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useProject } from 'hooks/useProject';

const ListSwitcher: FC = () => {
  const pathname = useLocation().pathname;
  const production = pathname.split('/')[1] !== 'local' ? true : false;
  const project = useProject();

  const itemList = [
    { name: 'Contents', url: production ? '/' : `/local/${project}/` },
    { name: 'Tags', url: production ? '/tags/' : `/local/tags/${project}/` },
    { name: 'ByDate', url: production ? '/bydate/' : `/local/bydate/${project}/` },
  ];

  return (
    <>
      <div className='list-nav-selector'>
        {itemList.map(v => (
          v.url === pathname
            ? <div key={v.name} className="list-nav-item-current">{v.name}</div>
            : <Link key={v.name} to={v.url} className="list-nav-item">{v.name}</Link>
        ))}
      </div>
    </>
  )
}

export default ListSwitcher;

