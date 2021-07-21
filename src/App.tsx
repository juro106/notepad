import { FC } from 'react';
import { Routes, Route } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
// import firebase from 'auth/firebase';
import Home from 'components/Home';
import About from 'components/About';
import MyEditor from 'components/Editor';
import Demo from 'components/Demo';
import Demo2 from 'components/Demo2';
import Login from 'components/Login';
import Nav from 'components/Nav';
import 'App.css';

const App: FC = () => {
  return (
    <div className="App">
    <Router>
      <Nav />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/demo' element={<Demo />} />
        <Route path='/about' element={<About />} />
        <Route path='/editor' element={<MyEditor />} />
  <Route path='/demo2/:slug' element={<Demo2 />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </Router>
    </div>
  );
}
export default App;
// {
//   // <Route path='/demo2' 
//   //   <Demo2 />
//   // </Route>
// }
// {
//   //<Route path='/demo2/:slug' 
//   //  <Demo2 />
//   //</Route>
// }
//   //
//   // const [user, setUser] = useState<firebase.User | null>(null);
//   // useEffect(() => {
//   //   return firebase.auth().onAuthStateChanged(user => {
//   //     setUser(user);
//   //     console.log(user);
//   //   });
//   // }, []);
//   //
//   // const login = () => {
//   //   const provider = new firebase.auth.GoogleAuthProvider();
//   //   firebase.auth().signInWithRedirect(provider);
//   // }
//   //
//   // const logout = () => {
//   //   firebase.auth().signOut();
//   // }
//   //
//       // <div>
//       //   <h3>UID: {user && user.uid}</h3>  
//       // </div>
//       // {user !== null ? (
//       //   <button onClick={logout}>Google Logout</button>
//       // ) : (
//       //   <button onClick={login}>Google Login</button>
//       // )}
