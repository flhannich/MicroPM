const Header = ( { back } ) => {

  return (

    <header className="main container">
      <div className="grid text--center pt2 pb2">
        {back !== undefined &&
          <button
            className="btn btn--none"
            onClick={() => back(null)}>
          B</button>
        }
      </div>
    </header>
  )
}

export default Header
