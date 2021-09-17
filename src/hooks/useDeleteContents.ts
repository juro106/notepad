import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useProject } from 'hooks/useProject';
import { useResetData } from 'hooks/useResetData';
import { deleteContents } from 'ducks/contents/actions';
import deleteContent from 'services/delete-content';

/*
 * DBのデータとstore上のデータ、両方を削除する
 * 記事単独ページで使われる場合
 */
export const useDeleteContents = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const project = useProject();
  const resetData = useResetData();
  // const query4rm = [contentsAllByDate, project]; // 全コンテンツソート＋日付加工済

  const deleteFunc = useCallback(async (slug: string) => {
    console.log(`delete: ${slug}`);
    dispatch(deleteContents(slug))
    const msg = await deleteContent(project, slug);
    console.log(msg);
    resetData(slug);
    navigate(`/local/${project}/`)
  }, [project, dispatch, navigate, resetData]);

  return deleteFunc;
}

