import { FC, useState, useEffect, useContext } from 'react';
import firebase from 'auth/firebase';
import { AuthContext } from 'contexts/authContext';
const Login: FC = () => {
  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    currentUser && setUser(currentUser)
  }, [currentUser]);

  const login = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  }
  const logout = () => {
    firebase.auth().signOut();
    setUser(null);
  }
  return (
    <>
      {user !== null ? (
        <button className='login-button' onClick={logout}>Logout</button>
      ) : (
        <button className='login-button' onClick={login}>Login</button>
      )}
      {/*<div>UID: {user && uid}</div>
      */}
    </>
  );
}

export default Login;

