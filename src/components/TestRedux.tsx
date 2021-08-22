import { FC } from 'react';
import { useSelector } from 'store';
import { useDispatch } from 'react-redux';
import { toggleLayout } from 'ducks/layout/actions';
import { setProject } from 'ducks/project/actions';

const TestRedux: FC = () => {
  const hoge = useSelector(state => state.hoge);
  const project = useSelector(state => state.project.project);
  console.log(project);
  const dispatch = useDispatch();
  const newProject = 'I am new Project';
  const anotherProject = 'シン・プロジェクト';


  return (
    <main>
      <p>test redux</p>
      <p>ストアに直接書いた Reducer の state: {hoge.msg}</p>
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

