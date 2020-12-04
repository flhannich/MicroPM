import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Logout, Header } from './../components'

import { AuthContext } from './../context/AuthContext'; // import based on where you put it

export default function Project() {
  const check = "dsa";

  const token = useContext(AuthContext).token;

    return (
      <>
      <Header />
      </>
    )
}
