import React from "react";
import { Link } from "react-router-dom";

export default class Settings extends React.Component {
  render() {
    return (
      <div>
        <p>Settings</p>
        <Link to="/">Go back to home</Link>
      </div>
    );
  }
}
