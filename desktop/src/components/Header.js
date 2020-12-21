import { useState } from 'react';
import { Dropdown, Account } from '../components';

const Header = ( { back } ) => {

  const [dropdownState, setDropdownState] = useState(false);

  return (

    <header className="main container">
      <div className="grid pt2 pb2">

        {(back !== undefined) 

        ?  <>
          <button
            className="btn btn--icon"
            onClick={() => back(null)}>

            <svg viewBox="0 0 100 100" className="ic-svg s16"> 
              <use xlinkHref="/assets/sprite.svg#back"></use>
            </svg>

          </button>

          </>
          
        : 
          <div className="dropdown-wrapper">
            <button 
              className="btn btn--icon"
              onClick={() => setDropdownState(true)}
              >
              <svg viewBox="0 0 100 100" className="ic-svg s16"> 
                <use xlinkHref="/assets/sprite.svg#folder"></use>
              </svg>
            </button>

            <Dropdown
              setDropdownState={setDropdownState}
              dropdownState={dropdownState}
            >
              <Account />
            </Dropdown>
          </div>
        }



      </div>
    </header>
  )
}

export default Header
