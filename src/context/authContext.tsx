import { FC, createContext, useState, useContext, useEffect } from 'react';
import firebase from 'firebase/app';

type AuthContextProps = {
  currentUser: firebase.User | null | undefined
}

const AuthContext = createContext<AuthContextProps>({ currentUser: undefined });

export const useAuthContext = () => {
  return useContext(AuthContext);
}

const AuthProvider: FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null | undefined>(undefined);

  useEffect(() => {
    // ログイン状態が変化すると firebase の auth メソッドを呼び出す
    firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
    })
  }, []);

  // 下層コンポーネントをラップする
  return <AuthContext.Provider value={{ currentUser: currentUser }}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };
