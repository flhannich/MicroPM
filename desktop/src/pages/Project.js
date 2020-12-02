import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Logout, Header, Footer } from './../components'

import { AuthContext } from './../context/AuthContext'; // import based on where you put it

export default function Project() {

  const token = useContext(AuthContext).token;

    return (
      <>
      <Header />

      <div className="container">

        <div>
          Project
          <Link to="/">Back</Link>
        </div>

        <Footer />
      </div>
      </>
    )
}
