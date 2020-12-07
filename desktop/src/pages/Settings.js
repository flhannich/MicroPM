import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Logout, SettingsAPI } from './../components'

import { AuthContext } from './../context/AuthContext'; // import based on where you put it

export default function Settings() {

  const token = useContext(AuthContext).token;

    return (
      <>

      <article className="main container">

        <Logout />
        <SettingsAPI />

      </article>
      </>
    )
}
