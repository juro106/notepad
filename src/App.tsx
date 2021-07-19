import { FC } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
// import firebase from 'auth/firebase';
import Home from 'components/Home';
import About from 'components/About';
import MyEditor from 'components/Editor';
import Login from 'components/Login';
import Nav from 'components/Nav';
import 'App.css';

const App: FC = () => {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Switch>
          <Route path='/login' exact>
            <Login />
          </Route>
          <Route path='/about' exact>
            <About />
          </Route>
          <Route path='/editor' exact>
            <MyEditor />
          </Route>
          <Route path='/' exact>
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
export default App;
  //
  // const [user, setUser] = useState<firebase.User | null>(null);
  // useEffect(() => {
  //   return firebase.auth().onAuthStateChanged(user => {
  //     setUser(user);
  //     console.log(user);
  //   });
  // }, []);
  //
  // const login = () => {
  //   const provider = new firebase.auth.GoogleAuthProvider();
  //   firebase.auth().signInWithRedirect(provider);
  // }
  //
  // const logout = () => {
  //   firebase.auth().signOut();
  // }
  //
      // <div>
      //   <h3>UID: {user && user.uid}</h3>  
      // </div>
      // {user !== null ? (
      //   <button onClick={logout}>Google Logout</button>
      // ) : (
      //   <button onClick={login}>Google Login</button>
      // )}
