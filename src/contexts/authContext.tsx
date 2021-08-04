import { FC, createContext, useState, useContext, useEffect } from 'react';
import firebase from 'firebase/app';
// import { useNavigate } from 'react-router';
import md5 from 'md5';

type AuthContextProps = {
  currentUser: firebase.User | null | undefined;
  uid: string;
  token: string;
  isLoggedIn: boolean;
  isLoaded: boolean;
  loading: string;
}

const AuthContext = createContext<AuthContextProps>({
  currentUser: undefined,
  uid: '',
  token: '',
  isLoggedIn: false,
  isLoaded: false,
  loading: '',
});

export const useAuthContext = () => {
  return useContext(AuthContext);
}

const AuthProvider: FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null | undefined>(undefined);
  const [md5uid, setMd5uid] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [loading, setLoading] = useState<string>('start');
  // const navigate = useNavigate();

  useEffect(() => {
    // ログイン状態が変化すると firebase の auth メソッドを呼び出す
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        setCurrentUser(user);
        setMd5uid(md5(user.uid));
        const idToken = await user.getIdToken();
        setToken(idToken);
        setLoading('loading');
        const res = await fetch(`${process.env.REACT_APP_API_URL}/secret/userinfo`,
          {
            headers: {
              Authorization: idToken
            }
          }
        );
        if (res) {
          setIsLoggedIn(true);
          setIsLoaded(true);
          setLoading('end');
        }
        // console.log(res);
      } else {
        setIsLoggedIn(false);
        setIsLoaded(true);
        setLoading('end');
      }
    });
    // }, [currentUser, navigate]);
  }, [currentUser]);

  // 下層コンポーネントをラップする
  return <AuthContext.Provider value={{
    currentUser: currentUser,
    uid: md5uid,
    token: token,
    isLoggedIn: isLoggedIn,
    loading: loading,
    isLoaded: isLoaded,
  }}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };
