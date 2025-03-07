import { User } from 'firebase/auth';
import React, { createContext, useState } from 'react';

interface authContext {
  authLoaded: boolean;
  setAuthLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  signedIn: boolean;
  setSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = createContext<authContext>({
  authLoaded: true,
  setAuthLoaded: () => false,
  signedIn: false,
  setSignedIn: () => null,
  user: null,
  setUser: () => null,
});

// This context provider is wrapped around the whole project
// so when the authentication status changes the project re-renders
export const AuthProvider: React.FC<{}> = ({ children }) => {
  const [authLoaded, setAuthLoaded] = useState(true);
  const [signedIn, setSignedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider
      value={{
        authLoaded,
        setAuthLoaded,
        signedIn,
        setSignedIn,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook for child components to get the auth object
export const useAuth = () => React.useContext(AuthContext);
