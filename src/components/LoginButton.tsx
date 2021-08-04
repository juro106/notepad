import { FC, useState, useEffect, useContext } from 'react';
import firebase from 'auth/firebase';
import { useNavigate } from 'react-router';
import { AuthContext } from 'contexts/authContext';
const LoginButton: FC = () => {
  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState<firebase.User | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    currentUser && setUser(currentUser)
  }, [currentUser]);

  const login = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
    navigate('/user', {state: {loginflg: true}})
  }
  const logout = () => {
    firebase.auth().signOut();
    setUser(null);
    navigate('/user', {state: {loginflg: false}})
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

export default LoginButton;

