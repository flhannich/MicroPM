import { useRef, useState, createContext, useEffect } from 'react'

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

  const [project, setProject] = useState(null); // FOR BACK NAVIGATION
  const [task, setTask] = useState(null); // FOR BACK NAVIGATION
  const [api, setApi] = useState(null);

  return (
    <AppContext.Provider
      value={{
        project,
        setProject,
        task,
        setTask,
        api,
        setApi,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
