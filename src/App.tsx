import { FC } from 'react';
import { Routes, Route } from 'react-router';
// import firebase from 'auth/firebase';
import { AuthProvider } from 'contexts/authContext';
import { ProjectProvider } from 'contexts/projectContext';
import Layout from 'components/Layout';
import Login from 'components/Login';
import About from 'components/FixedPage/About';
import ContentsManager from 'components/ContentsManager';
import MyEditor from 'components/Editor';
import ImageManager from 'components/Image/ImageManager';
import NewPost from 'components/NewContents';
import NewProject from 'components/NewProject';
import ProjectManager from 'components/Project/ProjectManager';
import LocalHome from 'components/LocalHome';
import PublicHome from 'components/PublicHome';
import PublicContents from 'components/PublicContents';
import PublicTags from 'components/Public/PublicTags';
import LocalProjectTop from 'components/LocalProjectTop';
import LocalTags from 'components/LocalProjectTop/LocalTags';
import LocalContents from 'components/LocalContents';
import ContentEditable from 'components/ContentEditable';
import LocalHomeRedirect from 'components/LocalHomeRedirect';

import 'App.css';

const App: FC = () => {
  return (
    <AuthProvider>
      <ProjectProvider>
        <Layout>
          <Routes>
            <Route path='/home' element={<LocalHomeRedirect />} />
            <Route path='/example' element={<ContentEditable />} />
            <Route path='/editor' element={<MyEditor />} />
            <Route path='/local/login' element={<Login />} />
            <Route path='/local/new-contents' element={<NewPost />} />
            <Route path='/local/new-project' element={<NewProject />} />
            <Route path='/local/contents-manager' element={<ContentsManager />} />
            <Route path='/local/image-manager' element={<ImageManager />} />
            <Route path='/local/project-manager' element={<ProjectManager />} />
            <Route path='/local/home' element={<LocalHome />} />
            <Route path='/local/tags/:projectName/' element={<LocalTags />} />
            <Route path='/local/:projectName/' element={<LocalProjectTop />} />
            <Route path='/local/:projectName/:slug' element={<LocalContents />} />
            <Route path='/about' element={<About />} />
            <Route path='/:slug' element={<PublicContents />} />
            <Route path='/tags/' element={<PublicTags />} />
            <Route path='/' element={<PublicHome />} />
          </Routes>
        </Layout >
      </ProjectProvider>
    </AuthProvider>
  );
}
export default App;

