import { FC, useEffect } from 'react';
import { useSelector } from 'store';
import { useDispatch } from 'react-redux';
import { useQuery } from 'react-query';
import getContentsAll from 'services/get-contents-all';

import { toggleLayout } from 'ducks/layout/actions';
import { setProject } from 'ducks/project/actions';
// import { toggleToast } from 'ducks/toast/actions';
import { setContents } from 'ducks/contents/actions';

import { Content } from 'models/content';

import { useFetch } from 'hooks/useFetch';

const TestRedux: FC = () => {
  const fuga = useSelector(state => state.fuga);
  const project = useSelector(state => state.project.project);
  console.log(project);
  const dispatch = useDispatch();
  const newProject = 'I am new Project';
  const anotherProject = 'シン・プロジェクト';
  // const slug1 = 'radiohead';
  // const slug2 = 'beatles';
  // const toastState = useSelector(state => state.toast);

  const { data } = useQuery(['contents-all-test'], () => getContentsAll(project, true));

  useFetch('contentsAll');

  useEffect(() => {
    data && dispatch(setContents(data))
  }, [data, dispatch]);

  const reduxData = useSelector(state => state.contents.list);
  console.log('reduxData', reduxData);


  const imageItem = (data: Content[]) => {
    console.log(data);
    console.log(data.length);

    const newData = data.filter(item => item.slug === 'image');
    console.log(newData);
  }

  return (
    <main>

      <button onClick={() => imageItem(reduxData)}>filter</button>
      <p>test redux</p>
      <p>ストアに直接書いた Reducer の state: {fuga.msg}</p>
      <button onClick={() => dispatch(toggleLayout())}>toggle</button>
      <button onClick={() => dispatch(setProject(newProject))}>{newProject}</button>
      <button onClick={() => dispatch(setProject(anotherProject))}>{anotherProject}</button>

      <p>現在のプロジェクト名: {project}</p>
      <Child />
    </main>
  )
}

export default TestRedux;

const Child: FC = () => {
  const layout = useSelector(state => state.layout.grid);


  return <div>
    <p>layout: {layout ? 'grid' : 'list'}</p>
  </div>;
}

