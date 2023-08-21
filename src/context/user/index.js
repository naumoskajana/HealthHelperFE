import { createContext, useContext, useState } from 'react';
import { setAuthHeader } from '../../api/axios-instance';

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isUserLoading, setIsUserLoading] = useState(true);

  const loginUser = (token, user) => {
    localStorage.setItem('jwt', token);
    setAuthHeader(token);
    setUser(user);
  };

  const logoutUser = () => {
    localStorage.removeItem('jwt');
    setAuthHeader();
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isUserLoading,
        setIsUserLoading,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);