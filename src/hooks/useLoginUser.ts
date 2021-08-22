import { useContext } from 'react';
import { AuthContext } from 'contexts/authContext';
import firebase from 'firebase/app';

export const useLoginUser = (): firebase.User => {
  const { currentUser: user } = useContext(AuthContext)

  if (user === null || user === undefined) throw new Error('AuthProviderでラップして下さい。');

  return user;
}

