import { FC } from 'react';
import ListSwitcher from 'components/common/ListSwitcher';
import RelatedMenu from 'components/common/RelatedMenu';

const ContentsListHeader: FC = () => {
  return (
    <>
      <ListSwitcher />
      <RelatedMenu />
    </>
  )
}

export default ContentsListHeader;

