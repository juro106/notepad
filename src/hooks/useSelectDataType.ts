import { useProject } from 'hooks/useProject';
import { QueryKey } from 'react-query';
import { Content } from 'models/content';
import { keyItems } from 'constants/my-queries';
import { setContents} from 'ducks/contents/actions';
import getContentsAll from 'services/get-contents-all';

type obj = {
  query: QueryKey;
  func: Promise<Content[]>;
  action: typeof setContents;
}

export const useSelectDataType = (dataType: string): obj => {
  const project = useProject();
  const { contentsAll, created_at, DESC, date } = keyItems;

  switch (dataType) {
    case 'sort_by=created_at': // 全コンテンツソート＋日付
      return {
        query: [contentsAll, project, { sort_by: created_at, order_by: DESC, embed: date }],
        func: getContentsAll(project, true, '?sort_by=created_at'),
        action: setContents,
      }
    default: // 全コンテンツ
      return {
        query: [contentsAll, project],
        func: getContentsAll(project, true),
        action: setContents,
      }
  }
}

