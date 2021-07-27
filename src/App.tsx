import { FC } from 'react';
import { Routes, Route } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
// import firebase from 'auth/firebase';
import Nav from 'components/Nav';
import Login from 'components/Login';
import Home from 'components/Home';
import About from 'components/About';
import Edit from 'components/Edit';
import MyEditor from 'components/Editor';
import NewPost from 'components/New';
import Demo2 from 'components/Demo2';
import MainContents from 'components/MainContents';
import ContentEditable from 'components/ContentEditable';
import 'App.css';

const App: FC = () => {
  return (
    <div className="App">
      <Router>
        <Nav />
        <div id="wrapper">
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/new' element={<NewPost />} />
            <Route path='/about' element={<About />} />
            <Route path='/editor' element={<MyEditor />} />
            <Route path='/edit' element={<Edit />} />
            <Route path='/demo2/:slug' element={<Demo2 />} />
            <Route path='/example' element={<ContentEditable />} />
            <Route path='/v1/:slug' element={<MainContents />} />
            <Route path='/' element={<Home />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}
export default App;

