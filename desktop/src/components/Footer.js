import react from "react";

const Footer = ( { children }) => {

  return (

    <footer className="main container">
      <div className="text--center pt3 pb3">
      {children}
    </div>
  </footer>

  )
}

export default Footer
