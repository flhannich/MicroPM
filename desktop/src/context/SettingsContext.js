import { createContext, useState} from 'react';

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {

  const [settings, setSettings] = useState(null);
  const [task, setTask] = useState(null);

  return (
    <SettingsContext.Provider
      value={{
        settings,
        setSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
