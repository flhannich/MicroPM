import React, {useEffect, useState, useContext} from "react";

import { Login, Dashboard, Header } from "./components"

import { AuthProvider, AuthContext } from './context/AuthContext'; // import based on where you put it

export default function App( probs ) {

  const context = useContext(AuthContext);

  useEffect(() => {
    window.ipcRenderer.on('INIT_TOKEN', function (event,token) {
      if(token !== undefined) {
        context.setToken(token)
      }
    })
  }, [])

  return (
    <>

        {(context.token === null)
          ? <Login />
          : <>
              <Header />
              <Dashboard />
            </>
        }

    </>
  )
}
