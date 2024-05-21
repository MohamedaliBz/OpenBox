// AuthContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import supabase from '../Utils/supabase';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  useEffect(() => {
    const checkAuthStatus = async () => {  
    const { data: { user } } = await supabase.auth.getUser()
    console.log("user : " ,user);
    setUser(user);
    };
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{user}}>
      {children}
    </AuthContext.Provider>
  );
};
