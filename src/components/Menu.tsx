import { FC } from 'react';
import { Link } from 'react-router-dom';

const Menu: FC = () => {
  return (
    <section className='section-menu'>
      <h2 className='menu-heading'>Menu</h2>
      <ul className="menu-list">
        <li className="menu-list-item-outer">
          <div className="menu-list-item-inner">
            <h3 className='menu-list-item-heading'>Projects プロジェクト管理/作成</h3>
            <p>新たにプロジェクトを作成したり、削除したりできます。</p>
            <ul className='menu-sub-list'>
              <li className='menu-sub-item'>
                <Link className='menu-sub-link' to='/newproject'>＋ 新規プロジェクト作成</Link>
              </li>
              <li className='menu-sub-item'>
                <Link className='menu-sub-link' to='/project-manager'>プロジェクト管理</Link>
              </li>
            </ul>
          </div>
        </li>
        <li className="menu-list-item-outer">
          <div className="menu-list-item-inner">
            <h3 className='menu-list-item-heading'>New 新規メモ作成</h3>
            <p>現在選択中のプロジェクトに新たにメモを作成します。</p>
            <ul className='menu-sub-list'>
              <li className='menu-sub-item'>
                <Link className='menu-sub-link' to='/new'>＋ 新規メモ作成</Link>
              </li>
            </ul>
          </div>
        </li>
        <li className="menu-list-item-outer">
          <div className="menu-list-item-inner">
            <h3 className='menu-list-item-heading'>Edit コンテンツ編集/削除</h3>
            <p>現在選択中のプロジェクトのメモの管理をします。</p>
            <p>一覧からメモの編集画面へ移動、削除できます。</p>
            <ul className='menu-sub-list'>
              <li className='menu-sub-item'>
                <Link className='menu-sub-link' to='/edit'>コンテンツ管理</Link>
              </li>
            </ul>
          </div>
        </li>
        <li className="menu-list-item-outer">
          <div className="menu-list-item-inner">
            <h3 className='menu-list-item-heading'>Images 画像管理</h3>
            <p>現在選択中のプロジェクトの画像を管理します。</p>
            <ul className='menu-sub-list'>
              <li className='menu-sub-item'>
                <Link className='menu-sub-link' to='/image-manager'>画像管理</Link>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </section>
  );
}
export default Menu;
