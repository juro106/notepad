import { FC, useEffect } from 'react';
import { useSelector } from 'store';
import { useDispatch } from 'react-redux';
import { useQuery } from 'react-query';
import getContentsAll from 'services/get-contents-all';

import { toggleLayout } from 'ducks/layout/actions';
import { setProject } from 'ducks/project/actions';
import { toggleToast } from 'ducks/toast/actions';
import { initContents } from 'ducks/contents/actions';

import { Content } from 'models/content';

const TestRedux: FC = () => {
  const fuga = useSelector(state => state.fuga);
  const project = useSelector(state => state.project.project);
  console.log(project);
  const dispatch = useDispatch();
  const newProject = 'I am new Project';
  const anotherProject = 'シン・プロジェクト';
  const slug1 = 'radiohead';
  const slug2 = 'beatles';
  const toastState = useSelector(state => state.toast);

  const { data } = useQuery(['contents-all-test'], () => getContentsAll(project, true));

  useEffect(() => {
    data && dispatch(initContents(data))
  }, [data, dispatch]);

  const reduxData = useSelector(state => state.contents.contents);
  console.log('reduxData', reduxData);


  const imageItem = (data: Content[]) => {
    console.log(data);
    console.log(data.length);

    const newData = data.filter(item => item.slug === 'image');
    console.log(newData);
  }

  const checkToastState = (slug: string) => {
    if (slug === toastState.slug) {
      if (toastState.isToast) {
        return 'True';
      } else {
        return 'False';
      }
    }
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
      <div>
        <h2>Toast</h2>
        <div>
          <span>
            radiohead: {toastState.slug}.
            isToast:{checkToastState('radiohead')}
          </span>
          <button onClick={() => dispatch(toggleToast(slug1))}>toggle</button>
        </div>
        <div>
          <span>
            beatles: {toastState.slug}.
            isToast:{checkToastState('beatles')}
          </span>
          <button onClick={() => dispatch(toggleToast(slug2))}>toggle</button>
        </div>
      </div>
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

