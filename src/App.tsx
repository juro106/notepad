import { FC } from 'react';
import { Routes, Route } from 'react-router';
// import firebase from 'auth/firebase';
import Nav from 'components/Nav';
import Login from 'components/Login';
import PublicHome from 'components/Home';
import LocalHome from 'components/LocalHome';
import About from 'components/About';
import Edit from 'components/Edit';
import MyEditor from 'components/Editor';
import NewPost from 'components/New';
import NewProject from 'components/NewProject';
import UserHome from 'components/UserHome';
import Demo2 from 'components/Demo2';
import MainContents from 'components/MainContents';
import LocalContents from 'components/LocalContents';
import ContentEditable from 'components/ContentEditable';
import 'App.css';

const App: FC = () => {
  return (
    <div className="App">
      <Nav />
      <div id="wrapper">
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/new' element={<NewPost />} />
          <Route path='/newproject' element={<NewProject />} />
          <Route path='/about' element={<About />} />
          <Route path='/editor' element={<MyEditor />} />
          <Route path='/edit' element={<Edit />} />
          <Route path='/demo2/:slug' element={<Demo2 />} />
          <Route path='/example' element={<ContentEditable />} />
          <Route path='/local/:slug' element={<LocalContents />} />
          <Route path='/:slug' element={<MainContents />} />
          <Route path='/local/' element={<LocalHome />} />
          <Route path='/home' element={<LocalHome />} />
          <Route path='/user' element={<UserHome />} />
          <Route path='/' element={<PublicHome />} />
        </Routes>
      </div>
    </div>
  );
}
export default App;

