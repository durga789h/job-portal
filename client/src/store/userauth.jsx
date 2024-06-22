//auth.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState('');
  const[isLoading,setIsLoading]=useState(true);
 

  console.log(token, 'token')
  const authorizationToken = `Bearer ${token}`;

  const storeTokenInLS = (serverToken) => {
    setToken(serverToken)
    return localStorage.setItem('token', serverToken);
  };

  let isloggedin = !!token;
  const LogoutUser = () => {
    setToken('');
    sessionStorage.removeItem("user");
    return localStorage.removeItem('token');
  }

  //jwt authentication-to get the currently loggedin user data
  const userAuthentication = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:5000/api/auth/user', {
        method: 'GET',
        headers: {
          Authorization: authorizationToken,
        }
      });
      console.log(response)
      if (response.ok) {
        const data = await response.json();
        console.log('user data', data.userData);
        setUser(data.userData);
        setIsLoading(false);
      }
      else{
        setIsLoading(false);
      }
    } catch (error) {
      console.error("error fetching user data")

    }

  }
  //to fetch the service data from database
 
  useEffect(() => {
    
    userAuthentication();
  }, [])


  const createCvData = async (formData) => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          Authorization: authorizationToken,
        },
        body: formData,
      };
  
      const response = await fetch('http://localhost:5000/api/auth/upload', requestOptions);
  
      if (!response.ok) {
        throw new Error('Failed to create cv page data');
      }
  
      const data = await response.json();
      console.log('Cv page data created/updated', data);
    } catch (error) {
      console.error('Error creating/updating cvpage data:', error);
    }
  };
  


  return (
    <AuthContext.Provider value={{ storeTokenInLS, LogoutUser, isloggedin, user, authorizationToken ,isLoading,createCvData}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
