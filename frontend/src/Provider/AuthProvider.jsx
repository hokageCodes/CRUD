import React, { useContext, useState, useEffect } from 'react';
import { loginUser, registerUser } from '../api';
import { useNavigate } from 'react-router-dom';
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}


export function AuthProvider({ children }) {
  const navigate  = useNavigate();
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const  signup = async (email, password) => {
        setLoading(true);
      const response = await registerUser(email, password);
      if(response.data){ 
        setLoading(false);
        return setCurrentUser(response.data);}
        setLoading(false);
     return setError({error: response.error});
    }
  
    const login = async (email, password) => {
      const response = await loginUser(email, password);
      if(response.data) { return setCurrentUser(response.data)}
      return setError({error: response.error})
    }
  useEffect(()=> {
    if(!currentUser){
      navigate('/login')
    }
  })
  useEffect(()=> {
    console.log('location',location.href.split('/').pop())
    console.log(currentUser)
    if(currentUser && location.href.split('/').pop() === 'login'){
      navigate('/')
    }
  },[currentUser, navigate])

  
    const value = {
      currentUser,
      login,
      signup,
      error,
    };
  
    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
  }