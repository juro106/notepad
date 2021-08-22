import { FC } from 'react';
import ListSwitcher from 'components/common/ListSwitcher';
import LayoutSwitcher from 'components/Button/LayoutSwitcher';

const ContentsListHeader: FC = () => {
  return (
    <>
      <ListSwitcher />
      <LayoutSwitcher />
    </>
  )
}

export default ContentsListHeader;

