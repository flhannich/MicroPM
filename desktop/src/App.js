import React, {useEffect, useState, useContext} from "react";

import { Link } from "react-router-dom";

import { Login, Dashboard } from "./components"

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

    <div className="container">
      <div className="grid pt3">

        {(context.token === null)

          ? <Login />
          : <Dashboard />

        }

      </div>
    </div>

  )
}
