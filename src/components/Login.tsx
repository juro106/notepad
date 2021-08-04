import { FC, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from 'contexts/authContext';
const Login: FC = () => {

  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() =>{
    if (isLoggedIn) {
        navigate('/user')
    }
  },[isLoggedIn, navigate])

  return <div className='spinner'></div>
}

export default Login;

