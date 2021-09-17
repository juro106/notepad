import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProject } from 'hooks/useProject';
import { useDispatch } from 'react-redux';
import { deleteContents } from 'ducks/contents/actions';
import { useResetData } from 'hooks/useResetData';
import { queryClient } from 'index';
import deleteContent from 'services/delete-content';

/*
 * DBのデータとstore上のデータ、両方を削除する
 * 記事単独ページで使われる場合
 */

export const useDeleteContentsOnEditor= () => {
  const navigate = useNavigate();
  const project = useProject();
  const dispatch = useDispatch();
  const resetData = useResetData();
  // const query4rm = [contentsAllByDate, project]; // 全コンテンツソート＋日付加工済

  const deleteFunc = useCallback(async (slug: string, tags: string[] | undefined) => {
    console.log(`delete: ${slug}`);
    dispatch(deleteContents(slug))
    const msg = await deleteContent(project, slug);
    console.log(msg);
    resetData(slug);
    tags && tags.forEach(v=> queryClient.removeQueries(['tags', project, v]));
    navigate(`/local/${project}/`)
  }, [project, dispatch, navigate, resetData]);

  return deleteFunc;
}

