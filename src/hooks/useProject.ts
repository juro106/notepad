// import { useContext } from 'react';
// import { ProjectContext } from 'contexts/projectContext';
import { useSelector } from 'store';

export function useProject(): string {
  // const { project } = useContext(ProjectContext);
  // if (project === null) throw Error("ProjectProvider でラップして下さい。");
  //
  // return project;

  const project = useSelector(state => state.project.project);

  return project;
}

