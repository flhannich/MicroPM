import React from "react";
import { Link } from "react-router-dom";

export default class App extends React.Component {
  render() {
    return (
      <div>
        <p>Home</p>
        <Link to="/settings">Go to profile</Link>
      </div>
    );
  }
}
