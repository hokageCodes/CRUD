import React, { useContext, useState, useEffect } from 'react';
import { loginUser, registerUser } from '../api';
import { useNavigate } from 'react-router-dom';
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}


// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
  const navigate  = useNavigate();
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const  signup = async (email, password, name) => {
        setLoading(true);
      const response = await registerUser(email, password,name);

      if(response?.data){ 
        setLoading(false);
        localStorage.setItem('user', JSON.stringify(response.data))
        return setCurrentUser(response.data);}
        setLoading(false);
     return setError({error: response.error});
    }
  
    const login = async (email, password) => {
      const response = await loginUser(email, password);
      if(response.data) { 
        localStorage.setItem('user', JSON.stringify(response.data))
        return setCurrentUser(response.data)}
      return setError({error: response.error})
    }

    const logout = () =>
    {
      localStorage.clear();
    }
  useEffect(()=> {
    console.log('location',location.href.split('/').pop())
    if(currentUser && ['login', 'signup'].indexOf(location.href.split('/').pop()) != -1){
      navigate('/')
    }
    if(!currentUser && location.href.split('/').pop() !== 'login' && location.href.split('/').pop() !== 'signup'){
      navigate('/login');
    }
  })

    const value = {
      currentUser,
      login,
      signup,
      logout,
      error,
    };
  
    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
  }