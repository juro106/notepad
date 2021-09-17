import { queryClient } from 'index';
import { keyItems } from 'constants/my-queries';

export const removeQueries = (project: string, slug?: string): void => {
  const { page, contentsAll, contentsAllByDate, tags, tagsAll, imagesAll, created_at, DESC, ASC, name, date } = keyItems;
  
  const Queries = [
    slug && [page, project, slug], // メモ単独
    slug && [tags, project, slug], // メモに紐づくタグ
    [contentsAll, project], // 全コンテンツ
    [contentsAll, project, { sort_by: created_at, order_by: DESC }], // 全コンテンツ（ソート投稿
    [contentsAll, project, { sort_by: created_at, order_by: DESC, embed: date }], // 全コンテンツソート＋日付
    [contentsAllByDate, project], // 全コンテンツソート＋日付加工済
    [tagsAll, project, { sort_by: name, order_by: ASC }], // 全タグ
    [imagesAll, project], // 全画像
  ];

  Queries.forEach(v => queryClient.removeQueries(v));
}

