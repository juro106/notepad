import { useContext } from 'react';
import { ProjectContext } from 'contexts/projectContext';

export function useProject(): string {
  const { project } = useContext(ProjectContext);

  if (project === null) throw Error("ProjectProvider でラップして下さい。");

  return project;
}

