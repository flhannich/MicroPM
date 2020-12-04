import { createContext, useState} from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

  const [project, setProject] = useState(null);
  const [task, setTask] = useState(null);

  return (
    <AppContext.Provider
      value={{
        project,
        setProject,
        task,
        setTask,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
