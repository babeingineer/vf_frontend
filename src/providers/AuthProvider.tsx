import React, { useState } from 'react';

interface IAuthContext {
  isLogin: boolean;
  userName: string;
  setIsLogin: (_: boolean) => void;
}

export const AuthContext = React.createContext<IAuthContext>({
  isLogin: false,
  userName: '',
  setIsLogin: () => {},
});

interface IAuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: IAuthProviderProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [userName, setUserName] = useState('Brandon');

  return (
    <AuthContext.Provider value={{ isLogin, setIsLogin, userName }}>
      {children}
    </AuthContext.Provider>
  );
}
