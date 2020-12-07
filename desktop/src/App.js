import React, {useEffect, useState, useContext} from "react";

import { Login, Logout, Dashboard, Project, Task, Header } from "./components"

import { AuthContext } from './context/AuthContext';
import { AppContext } from './context/AppContext';
import { SettingsContext } from './context/SettingsContext';

export default function App( probs ) {

  const auth = useContext(AuthContext);
  const settings = useContext(SettingsContext);
  const app = useContext(AppContext);

  useEffect(() => {
    window.ipcRenderer.on('INIT_TOKEN', function (event,data) {
      if(data.token !== undefined) {
        auth.setToken(data.token)
      }
      if(data.api !== undefined) {
        settings.setApi(data.api)
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
