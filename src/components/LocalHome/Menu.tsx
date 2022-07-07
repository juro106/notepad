import { FC } from 'react';
import { Link } from 'react-router-dom';

const Menu: FC = () => {
  const Items = [
    {
      name: 'プロジェクト管理',
      url: '/local/project-manager'
    },
    {
      name: 'コンテンツ管理',
      url: '/local/contents-manager'
    },
    {
      name: '画像管理',
      url: '/local/image-manager'
    },
    {
      name: '新規メモ作成',
      url: '/local/new-contents'
    },
  ];

  return (
    <section className='section-menu'>
      <h2 className='menu-heading'>Menu</h2>
      <ul className='menu-sub-list'>
        {Items.map((v => (
          <li key={v.url} className='menu-sub-item'>
            <Link className='menu-sub-link' to={v.url}>{v.name}</Link>
          </li>
        )))}
      </ul>
    </section>
  );
}

export default Menu;

