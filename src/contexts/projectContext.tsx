import { FC, createContext, useState, useContext, useCallback } from 'react';
// import { Content } from 'models/content';

type ProjectProps = {
  project: string;
  setCurrentProject: (project: string) => void;
}

// default
const ProjectContext = createContext<ProjectProps>({
  project: '',
  setCurrentProject: () => { },
});

export const useProjectContext = () => {
  return useContext(ProjectContext);
}

export const useProject = (): ProjectProps => {
  // state名 ProjectContex type のプロパティに合わせる
  const [project, setProject] = useState('');
  // 関数名は ProjectContexy type のプロパティに合わせる
  const setCurrentProject = useCallback((current: string): void => {
    setProject(current);
  }, []);
  return {
    project,
    setCurrentProject,
  }
}

const ProjectProvider: FC = ({ children }) => {
  const ctx = useProject();
  // 下層コンポーネントをラップする
  return <ProjectContext.Provider value={ctx}>{children}</ProjectContext.Provider>;
}

export { ProjectContext, ProjectProvider };

