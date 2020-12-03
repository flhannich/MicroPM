import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Logout, Header } from './../components'

import { AuthContext } from './../context/AuthContext'; // import based on where you put it

export default function Settings() {

  // const _updateUserx = () => {
  //   fetch(`http://192.168.178.35:8000/api/logout`, {
  //       method: "POST",
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json',
  //         'authorization': context.token,
  //       }
  //     })
  //     .then((response) => response.json())
  //     .then((json) => {
  //       window.ipcRenderer.send('TOKEN', null)
  //       context.setToken(null)
  //       console.log('logged out')
  //     })
  //     .catch((error) => console.error(error))
  // }


  const token = useContext(AuthContext).token;

    return (
      <>
      <Header />

      <article className="main container">

        <div>
          <Link to="/">Back</Link>
        </div>

        <div>
          <Logout />
        </div>

      </article>
      </>
    )
}
