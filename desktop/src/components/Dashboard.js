import React, {useEffect, useState, useContext} from "react";

import { Link } from "react-router-dom";

import { Login, Footer } from "../components"

import { AuthProvider, AuthContext } from '../context/AuthContext'; // import based on where you put it

const Dashboard = () => {

const backUrl = '/some/other/value'

const token = useContext(AuthContext).token;

    return (
      <>

        <div className="container">

          <p>Dashboard</p>

        </div>

        <Footer />
        
      </>
    )
  }

export default Dashboard
