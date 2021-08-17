import { FC } from 'react';
import { Link } from 'react-router-dom';

const Menu: FC = () => {
  return (
    <section className='section-menu'>
      <h2 className='menu-heading'>Menu</h2>
      <ul className='menu-sub-list'>
        <li className='menu-sub-item'>
          <Link className='menu-sub-link' to='/local/project-manager'>プロジェクト管理</Link>
        </li>
        <li>
          <Link className='menu-sub-link' to='/local/contents-manager'>コンテンツ管理</Link>
        </li>
        <li className='menu-sub-item'>
          <Link className='menu-sub-link' to='/local/image-manager'>画像管理</Link>
        </li>
        <li className='menu-sub-item'>
          <Link className='menu-sub-link' to='/local/new-contents'>＋ 新規メモ作成</Link>
        </li>
      </ul>
    </section>
  );
}
export default Menu;
