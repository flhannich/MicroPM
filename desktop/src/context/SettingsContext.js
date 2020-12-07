import { createContext, useState} from 'react';

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {

  const [api, setApi] = useState(null);

  return (
    <SettingsContext.Provider
      value={{
        api,
        setApi,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
