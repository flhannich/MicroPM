import React, {useEffect, useState, useContext} from "react";

import { Link } from "react-router-dom";

import { Login } from "../components"

import { AuthProvider, AuthContext } from '../context/AuthContext'; // import based on where you put it

const Dashboard = () => {

const backUrl = '/some/other/value'

const token = useContext(AuthContext).token;

    return (
      <div>
        <p>Dashboard</p>
        <Link to="/settings">Settings</Link>
        <Link to="/settings">Archive</Link>
        <Link to="/settings">Add Project</Link>

        <Link to={{pathname: `/project`, query: {backUrl}}}>Project</Link>

      </div>
    )
  }

export default Dashboard
