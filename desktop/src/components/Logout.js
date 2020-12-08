import React, { useState, useContext } from 'react'
import { Link } from "react-router-dom";

import { AuthContext } from './../context/AuthContext.js'
import { SettingsContext } from './../context/SettingsContext.js'

const Logout = () => {

  const auth = useContext(AuthContext);
  const settings = useContext(SettingsContext);

  // FIX Correct Response if Url is not Correct
  const _logout = () => {
    fetch(`${settings.api}api/logout`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'authorization': auth.token,
        }
      })
      .then((response) => response.json())
      .then((json) => {
        window.ipcRenderer.send('TOKEN', null)
        auth.setToken(null)
        console.log('logged out')
      })
      .catch((error) => console.error(error))
  }

  const logout = event => {
    event.preventDefault();
      _logout();
  }


  return (
    <>

      {(auth.token !== null)
        ? <a className="btn btn--secondary" onClick={logout}>Logout</a>
        : <Link className="btn btn--secondary" to="/">Login</Link>
      }

    </>
  )
}

export default Logout
