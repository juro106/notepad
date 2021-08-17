import { FC, useContext } from 'react';
import { ProjectContext } from 'contexts/projectContext';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const ListSwitcher: FC<{production?: boolean}> = ({production}) => {
  const pathname = useLocation().pathname;
  const { project } = useContext(ProjectContext);

  const itemList = [
    { name: 'Contents', url: production ? '/' :`/local/${project}/` },
    { name: 'Tags', url: production ? '/tags/' : `/local/tags/${project}/` },
  ];

  return (
    <div className='list-nav-selector'>
      {itemList.map(v => (
        v.url === pathname
          ? <div key={v.name} className="list-nav-item-current">{v.name}</div>
          : <Link key={v.name} to={v.url} className="list-nav-item">{v.name}</Link>
      ))}
    </div>
  )
}

export default ListSwitcher;

