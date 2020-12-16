import { useState, useContext } from "react";

import { Logout } from '../components';
import { AuthContext } from './../context/AuthContext.js'


export default function Settings() {

const token = useContext(AuthContext).token;

const [tabKey, setTabKey] = useState('account');

// window.ipcRenderer.send('logout', `This message goes back to the main window.`);


    return (
      <>

      <article className="main container">


      <div className="tab-navigation">

        <button
          className={`btn btn--none ${tabKey === "account" && 'is-active'}`}
          onClick={() => setTabKey('account')}
        >Account
        </button>

        {/* <button 
          className={`btn btn--none ${tabKey === "user" && 'is-active'}`}
          onClick={() => setTabKey('user')}
        >User
        </button> */}

        <button 
          className={`btn btn--none ${tabKey === "client" && 'is-active'}`}
          onClick={() => setTabKey('client')}
        >Client
        </button>

        <button 
          className={`btn btn--none ${tabKey === "app" && 'is-active'}`}
          onClick={() => setTabKey('app')}
        >App
        </button>

      </div>

      
      <div className="tabs-wrapper">

        <div 
          className={`tab ${tabKey === "account" && 'is-active'}`}
        >
          <h2>Account Settings</h2>
          <ul>
            <li>Change Password/Username</li>
            <Logout />
          </ul>
        </div>

        {/* <div 
          className={`tab ${tabKey === "user" && 'is-active'}`}
        >
          <h2>User Settings</h2>
          <ul>
            <li>Add/Remove</li>
            <li>Change Role</li>
          </ul>
        </div> */}

        <div 
          className={`tab ${tabKey === "client" && 'is-active'}`}
        >
          <h2>Client Settings</h2>
          <ul>
            <li>Add/Remove</li>
            <li>Change Password</li>
            <li>Change Username</li>
          </ul>
        </div>

        <div 
          className={`tab ${tabKey === "app" && 'is-active'}`}
        >
          <h2>App Settings</h2>
          <ul>
            <li>Change Api</li>
          </ul>
        </div>
      </div>

      </article>
      </>
    )
}
