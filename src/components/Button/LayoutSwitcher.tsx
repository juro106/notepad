import { FC, memo } from 'react';
// import { useLayout } from 'hooks/useLayout';
// import { useSelector } from 'store';
// import { useDispatch } from 'react-redux';
// import { toggleLayout } from 'ducks/layout/actions';
import { useLayout } from 'hooks/useLayout';

const LayoutSwitcher: FC = memo(() => {
  // const { grid, switchLayout } = useLayout();
  // const grid = useSelector(state => state.layout.grid);
  // const dispatch = useDispatch();
  const { grid, toggleGrid } = useLayout();

  return <button className='layout-switcher' onClick={() => toggleGrid()}>{grid ? 'to List' : 'to Grid'}</button>
});

export default LayoutSwitcher;

