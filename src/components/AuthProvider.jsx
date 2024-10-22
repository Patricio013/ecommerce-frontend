import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: null, role: null });

  const login = (token, role) => {
    try {
      setAuth({ token, role });
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      logout();
    }
  };
  

  const logout = () => {
    setAuth({ token: null, role: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};