import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Logout, Header, Footer } from './../components'

import { AuthContext } from './../context/AuthContext'; // import based on where you put it

export default function Task() {

  const token = useContext(AuthContext).token;

    return (
      <>
      <Header />

      <div className="container">

        <div>
          Task
          <Link to="/project">Back</Link>
        </div>

        <Footer />
      </div>
      </>
    )
}
