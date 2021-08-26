import { queryClient } from 'index';
import { keyItems } from 'constants/my-queries';

export const removeQueries = (project: string, slug?: string): void => {
  const { page, contentsAll, tags, tagsAll, created_at, DESC, ASC, name, date } = keyItems;
  
  const Queries = [
    slug && [page, project, slug], // メモ単独
    [contentsAll, project], // 全コンテンツ
    [contentsAll, project, { sort_by: created_at, order_by: DESC }], // 全コンテンツ（ソート投稿
    [contentsAll, project, { sort_by: created_at, order_by: DESC, embed: date }], // 全コンテンツソート＋日付
    slug && [tags, project, slug], // メモに紐づくタグ
    [tagsAll, project, { sort_by: name, order_by: ASC }], // 全タグ
  ];

  Queries.forEach(v => queryClient.removeQueries(v));
}

