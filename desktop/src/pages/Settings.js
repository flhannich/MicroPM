// import { useState, useContext } from "react";

import { Logout } from '../components';

// import { AuthContext } from './../context/AuthContext.js'

export default function Settings() {

// const auth = useContext(AuthContext)

    return (
      <>

      <article className="main container">

      <div>
        <h2>Account Settings</h2>
        <ul>
          <li>Change Password/Username</li>
          <li>Change Role</li>
        </ul>
      </div>

      <div>
        <h2>User Settings</h2>
        <ul>
          <li>Add/Remove</li>
          <li>Change Role</li>
        </ul>
      </div>

      <div>
        <h2>Client Settings</h2>
        <ul>
          <li>Add/Remove</li>
          <li>Change Password</li>
          <li>Change Username</li>
        </ul>
      </div>

      <div>
        <h2>App Settings</h2>
        <ul>
          <li>Change Api</li>
          <Logout />
        </ul>
      </div>

      </article>
      </>
    )
}
