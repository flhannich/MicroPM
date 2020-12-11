const Header = ( { back } ) => {

  return (

    <header className="main container">
      <div className="grid text--center pt2 pb2">

        {back !== undefined &&

          <button
            className="btn btn--icon"
            onClick={() => back(null)}>

            <svg viewBox="0 0 100 100" className="ic-svg s16"> 
              <use xlinkHref="/assets/sprite.svg#back"></use>
            </svg>

          </button>
        }

      </div>
    </header>
  )
}

export default Header
