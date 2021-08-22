import { FC, memo, useState, useEffect, useContext, useCallback } from 'react';
import firebase from 'auth/firebase';
import { useNavigate } from 'react-router';
import { AuthContext } from 'contexts/authContext';
import Logout from 'services/logout';

const LoginButton: FC = memo(() => {
  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState<firebase.User | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    currentUser && setUser(currentUser)
  }, [currentUser]);

  const login = useCallback(() => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
    navigate('/local/home', { state: { loginflg: true } })
  }, [navigate]);

  const logout = useCallback(async () => {
    firebase.auth().signOut();
    const res = await Logout();
    console.log(res);
    setUser(null);
    navigate('/local/home', { state: { loginflg: false } })
  }, [navigate]);

  return (
    <>
      {user !== null ? (
        <button className='login-button' onClick={logout}>Logout</button>
      ) : (
        <button className='login-button' onClick={login}>Login</button>
      )}
    </>
  );
});

export default LoginButton;

