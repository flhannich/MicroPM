import React from "react";
import { Link } from "react-router-dom";

import { Logout } from './../components'

export default class Settings extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="grid pt3">

          <p>Settings</p>
          <Link to="/">Dashboard</Link>
          <Logout />
        </div>
      </div>
    );
  }
}
