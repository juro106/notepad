// import { useLayoutContext, LayoutProps } from 'contexts/layoutContext';
import { useCallback } from 'react';
import { useSelector } from 'store';
import { useDispatch } from 'react-redux';
import { toggleLayout } from 'ducks/layout/actions';

type LayoutProps = {
  grid: boolean;
  toggleGrid: () => void;
  // toggleGrid: { type: "TOGGLE_LAYOUT" };
}

export const useLayout = (): LayoutProps => {
  // const ctx = useLayoutContext();
  // const grid = ctx.grid;
  // const switchLayout = ctx.switchLayout;

  const grid = useSelector(state => state.layout.grid);
  const dispatch = useDispatch();
  const toggleGrid = useCallback(() => {
    dispatch(toggleLayout());
  }, [dispatch]);

  // return { grid, switchLayout }
  return { grid, toggleGrid }
}

