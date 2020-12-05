import react from "react";

const Footer = ( { children }) => {

  return (

    <footer className="main container">
      <div className="text--center pt2 pb2">
      {children}
    </div>
  </footer>

  )
}

export default Footer
