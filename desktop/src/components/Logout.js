import React, { useContext } from 'react'

import { AuthContext } from './../context/AuthContext.js'
import { AppContext } from './../context/AppContext.js'

const Logout = () => {

  const auth = useContext(AuthContext);
  const app = useContext(AppContext);

  // FIX Correct Response if Url is not Correct
  const _logout = () => {
    fetch(`${app.api}/api/logout`, {
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

        <button className="btn btn--none" onClick={logout}>Logout from account</button>

  )
}

export default Logout
