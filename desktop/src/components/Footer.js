import react from "react";

import { Link } from "react-router-dom";

const check = 'test';

const Footer = () => {

  return (

    <div className="container">
      <div className="text--center">
        <Link to={{pathname: `/settings`, query: {check}}}>Archive</Link>
        <Link to={{pathname: `/settings`, query: {check}}}>Add Project</Link>
        <Link to={{pathname: `/settings`, query: {check}}}>Settings</Link>
      </div>
    </div>
  )
}

export default Footer
