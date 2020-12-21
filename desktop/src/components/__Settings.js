import { useState, useContext } from "react";

import { Account, SettingsClientList, Logout } from '../components';


const Settings = () => {

const [tabKey, setTabKey] = useState('account');

// window.ipcRenderer.send('logout', `This message goes back to the main window.`);


    return (
      <>

      <article className="main container">


      <div className="tab-navigation">

       {/* <button 
          className={`btn btn--none ${tabKey === "client" ? 'is-active' : ''}`}
          onClick={() => setTabKey('client')}
        >Clients
        </button> */}

        <button
          className={`btn btn--none ${tabKey === "account" ? 'is-active' : ''}`}
          onClick={() => setTabKey('account')}
        >Account
        </button>

        {/* <button 
          className={`btn btn--none ${tabKey === "user" ? 'is-active' : ''}`}
          onClick={() => setTabKey('user')}
        >User
        </button> */}

        {/* <button 
          className={`btn btn--none ${tabKey === "app" ? 'is-active' : ''}`}
          onClick={() => setTabKey('app')}
        >App
        </button> */}

      </div>

      
      <div className="tabs-wrapper pt3">

        <div 
          className={`tab ${tabKey === "account" ? 'is-active' : 'is-hidden'}`}
        >
            <Account />
        </div>

        {/* <div 
          className={`tab ${tabKey === "user" ? 'is-active' : 'is-hidden'}`}
        >
          <h2>User Settings</h2>
          <ul>
            <li>Add/Remove</li>
            <li>Change Role</li>
          </ul>
        </div> */}

        <div 
          className={`tab ${tabKey === "client" ? 'is-active' : 'is-hidden'}`}
        >
          <SettingsClientList />

        {/* <div 
          className={`tab ${tabKey === "app" ? 'is-active' : 'is-hidden'}`}
        >
          <h2>App Settings</h2>
          <ul>
            <li>Change Api</li>
          </ul>
        </div>*/}
      </div> 

      </div>

      </article>
      </>
    )
}


export default Settings
