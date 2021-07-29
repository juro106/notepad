import { FC, createContext, useState, useContext, useEffect } from 'react';
import firebase from 'firebase/app';
import md5 from 'md5';

type AuthContextProps = {
  currentUser: firebase.User | null | undefined;
  uid: string;
}

const AuthContext = createContext<AuthContextProps>({ currentUser: undefined, uid: '' });

export const useAuthContext = () => {
  return useContext(AuthContext);
}

const AuthProvider: FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null | undefined>(undefined);
  const [md5uid, setMd5uid] = useState<string>('');

  useEffect(() => {
    // ログイン状態が変化すると firebase の auth メソッドを呼び出す
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
        setMd5uid(md5(user.uid));
      }
    })
  }, []);

  // 下層コンポーネントをラップする
  return <AuthContext.Provider value={{ currentUser: currentUser, uid: md5uid }}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };
