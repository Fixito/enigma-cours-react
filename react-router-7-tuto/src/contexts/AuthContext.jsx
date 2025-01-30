import { createContext, useContext, useState } from 'react';

import { useNavigate } from 'react-router';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

const fakeAuth = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve('userToken'), 250);
  });

export default function AuthProvider({ children }) {
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const token = await fakeAuth();
    setToken(token);
    navigate('/dashboard');
  };

  const handleLogout = () => {
    setToken('');
  };

  const value = {
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuthContext() {
  if (!AuthContext) {
    throw new Error('useAuthContext must be used in an <AuthProvider />');
  }

  return useContext(AuthContext);
}
