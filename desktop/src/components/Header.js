import react from "react";

const Header = ( { back } ) => {

  return (

    <header className="main container">
      <div className="grid text--center pt2 pb2">
        {back !== undefined &&
          <a
            className="btn btn--none"
            onClick={() => back(null)}>
          B</a>
        }
        <h2>Active Task</h2>
      </div>
    </header>
  )
}

export default Header
