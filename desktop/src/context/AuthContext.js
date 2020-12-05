import { createContext, useState} from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        username,
        setUsername
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
