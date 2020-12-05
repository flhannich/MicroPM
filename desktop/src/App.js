import React, {useEffect, useState, useContext} from "react";

import { Login, Logout, Dashboard, Project, Task, Header } from "./components"

import { AuthContext } from './context/AuthContext';
import { AppContext } from './context/AppContext';

export default function App( probs ) {

  const auth = useContext(AuthContext);
  const app = useContext(AppContext);

  useEffect(() => {
    window.ipcRenderer.on('INIT_TOKEN', function (event,data) {
      if(data !== undefined) {
        auth.setToken(data)
      }
    })
  }, [])

  return (
    <>

        {(auth.token === null)
          ? <Login />
          : <>

              {app.project === null && app.task === null &&
                <Dashboard />
              }

              {app.project !== null && app.task === null &&
                <Project />
              }

              {app.task !== null &&
                <Task />
              }

            </>
        }

    </>
  )
}
