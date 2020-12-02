import React, { useState, useContext } from 'react'
import { Link } from "react-router-dom";

import { AuthContext } from './../context/AuthContext.js'

const Logout = () => {

  const context = useContext(AuthContext);
  console.log(context.token)
  // FIX Correct Response if Url is not Correct

  const _logout = () => {
    fetch(`http://192.168.178.35:8000/api/logout`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'authorization': context.token,
        }
      })
      .then((response) => response.json())
      .then((json) => {
        window.ipcRenderer.send('TOKEN', null)
        context.setToken(null)
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

      {(context.token !== null)
        ? <a className="btn btn--secondary" onClick={logout}>Logout</a>
        : <Link className="btn btn--secondary" to="/">Login</Link>
      }

    </>
  )
}

export default Logout
