import React, {useEffect, useContext} from "react";

import { Login, Dashboard, Project, Task } from "./components"

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
        // auth.setToken(null)
      }
      if(data.api !== undefined) {
        settings.setApi(data.api)
        // settings.setApi(null)
      }
      if(data.api !== undefined) {
        auth.setUsername(data.username)
        // auth.setUsername(null)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

// php artisan serve --host=192.168.178.35 --port=8000

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
