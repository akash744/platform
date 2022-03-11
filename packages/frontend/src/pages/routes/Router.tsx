import React, { useEffect, useState } from 'react';
import AuthenticatedRoutes from './AuthenticatedRoutes';
import UnauthenticatedRoutes from './UnauthenticatedRoutes';
import { getAuth } from 'firebase/auth';
import { useAuth } from '../../hooks/useAuth';
import { useLocation } from 'react-router-dom';

interface RouterProps {}

const Router: React.FC<RouterProps> = () => {
  const { authLoaded, setAuthLoaded, signedIn, setUser } = useAuth();

  const location = useLocation()
  let path = location.pathname
  const inviteCode = path.slice(path.indexOf("=") + 1)
  const joinCheck = path.slice(1,5)
  

  // change to  api call
  const getUserHouseCode = () => {
    return { data: null };
  };
  const { data: code } = getUserHouseCode();

  const joinHouse = () => {
    if (localStorage.getItem('code')) {
      console.log('user added to the house');
    }
  };

  useEffect(() => {
    // returns function to stop the listener
    const clearListener = getAuth().onAuthStateChanged((user) => {
      setAuthLoaded(true);
      setUser(user);
    });
    return () => {
      clearListener();
    };
  }, [setAuthLoaded, setUser]);

  if (!authLoaded) {
    return null;
  }

  if (!signedIn) {
    // Route to sign-in page with stored code

    if (joinCheck === "join"){
      localStorage.setItem('code', inviteCode);
      console.log("Stored")
    }
    return <UnauthenticatedRoutes />;
  }
  
  if (signedIn){
    if (joinCheck === "join"){
      
      if (localStorage.getItem('code')){
        localStorage.getItem('code')
        console.log("Retrieved Code")
        if ( code === null){
          joinHouse();
          console.log("1.")
        }
        else{
          return <AuthenticatedRoutes alreadyInFlat={true} />;
        }
        localStorage.removeItem('code')
        console.log("Removed Code")
        return <AuthenticatedRoutes alreadyInFlat={false} />;
      }
      else if (code === null){
        joinHouse();
        console.log("2.")
        return <AuthenticatedRoutes alreadyInFlat={false} />;
      }
      return <AuthenticatedRoutes alreadyInFlat={true} />;
    }
    
  }

  return <AuthenticatedRoutes alreadyInFlat={false} />;
  
};

export default Router;