import { FC } from 'react';
import { Routes, Route } from 'react-router';
// import firebase from 'auth/firebase';
import Nav from 'components/Nav';
import Login from 'components/Login';
import PublicHome from 'components/PublicHome';
import LocalHome from 'components/LocalHome';
import About from 'components/About';
import Edit from 'components/Edit';
import MyEditor from 'components/Editor';
import ImageManager from 'components/Image/ImageManager';
import NewPost from 'components/New';
import NewProject from 'components/NewProject';
import ProjectManager from 'components/ProjectManager';
import UserHome from 'components/UserHome';
import Demo2 from 'components/Demo2';
import PublicContents from 'components/PublicContents';
import LocalProjectTop from 'components/LocalProjectTop';
import LocalContents from 'components/LocalContents';
import ContentEditable from 'components/ContentEditable';
import 'App.css';

const App: FC = () => {
  return (
    <>
      <Nav />
      <div id="wrapper">
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/new' element={<NewPost />} />
          <Route path='/newproject' element={<NewProject />} />
          <Route path='/about' element={<About />} />
          <Route path='/editor' element={<MyEditor />} />
          <Route path='/edit' element={<Edit />} />
          <Route path='/image-manager' element={<ImageManager />} />
          <Route path='/project-manager' element={<ProjectManager />} />
          <Route path='/demo2/:slug' element={<Demo2 />} />
          <Route path='/example' element={<ContentEditable />} />
          <Route path='/:slug' element={<PublicContents />} />
          <Route path='/local/' element={<LocalHome />} />
          <Route path='/home' element={<UserHome />} />
          <Route path='/local/:projectName/' element={<LocalProjectTop />} />
          <Route path='/local/:projectName/:slug' element={<LocalContents />} />
          <Route path='/' element={<PublicHome />} />
        </Routes>
      </div>
    </>
  );
}
export default App;

