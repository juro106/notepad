import { FC, useState, useEffect, useContext } from 'react';
import firebase from 'auth/firebase';
import { useNavigate } from 'react-router';
import { AuthContext } from 'contexts/authContext';
import Logout from 'services/logout';

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
    navigate('/home', {state: {loginflg: true}})
  }
  const logout = async () => {
    firebase.auth().signOut();
    const res = await Logout();
    console.log(res);
    setUser(null);
    navigate('/home', {state: {loginflg: false}})
  }
  return (
    <>
      {user !== null ? (
        <button className='login-button' onClick={logout}>Logout</button>
      ) : (
        <button className='login-button' onClick={login}>Login</button>
      )}
    </>
  );
}

export default LoginButton;

