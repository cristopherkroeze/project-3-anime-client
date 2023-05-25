// src/context/auth.context.js

import { useState, useEffect, createContext } from "react";
import axios from "axios";
const API_URL = "https://anime-project-3-server.fly.dev";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  let currentUser;
  const storeToken = (token) => { 
    localStorage.setItem('authToken', token);
  }

  const removeToken = () => {                   
    localStorage.removeItem("authToken");
  }

  const authenticateUser = () => {            
    const storedToken = localStorage.getItem('authToken');
    
    if (storedToken) {
      axios.get(
        `${API_URL}/auth/verify`, 
        { headers: { Authorization: `Bearer ${storedToken}`} }
      )
      .then((response) => {
        console.log("user", response.data)
        const user = response.data;      
        setIsLoggedIn(true);
        setIsLoading(false);
        setUser(user);        
      })
      .catch((error) => {       
        setIsLoggedIn(false);
        setIsLoading(false);
        setUser(null);
        removeToken();    
      });      
    } else {
        setIsLoggedIn(false);
        setIsLoading(false);
        setUser(null);      
    }   
  }

  const setCurrentUser = (currentUser) = () => {
    setUser(currentUser)
  }
  
  const logOutUser = () => {                     
    removeToken();   
    authenticateUser();
  }  
  
  useEffect(() => {                                    
    authenticateUser();                   
   }, []);
  
  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, user, storeToken, authenticateUser, logOutUser, setCurrentUser, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider, AuthContext };
