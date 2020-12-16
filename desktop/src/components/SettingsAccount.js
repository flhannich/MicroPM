import { useState, useRef } from 'react';
import { Logout } from './'

const SettingsAccount = ( ) => {

const username = useRef();
const password = useRef();
const passwordRepeat = useRef();

const [errorMessage, setErrorMessage] = useState(null);
const [usernameError, setUsernameError] = useState(false);
const [passwordError, setPasswordError] = useState(false);

console.log(passwordError);

const validateUsername = event => {
  event.preventDefault();
}

const validatePassword = event => {

  event.preventDefault();
  console.log(password.current.value)
  console.log(passwordRepeat.current.value)
  if(password.current.value === passwordRepeat.current.value) {
    // _storePassword()
  } else {
    setPasswordError(true);
    setErrorMessage('Password dont match');
  }
}

  return (

    <>

      <form
        className={`contact-form pt4 pb4 ${errorMessage !== '' && 'has-error'}`}
        action=''
        >

        <h2 className="pb3">Change your Username</h2>

        <div className="form-group pb3">
          <div className={`group-item ${usernameError && 'has-error'}`}>
            <label htmlFor="username">Username</label>
            <input
              ref={username}
              type="text"
              data-type="username"
              name="username"
              max-length="40"
              placeholder="Charlie Chaplin"
              defaultValue="admin"
            />
          </div>
        </div>

        { usernameError &&
          <div className="form-error mb3">
              <span className="error-message">{errorMessage}</span>
          </div>
        }
        
        <button
          className="btn btn--secondary"
          onClick={validateUsername}
        >
          Update
        </button>

      </form>
      


      <form
        className={`contact-form pt3 pb6 ${errorMessage !== '' && 'has-error'}`}
        action=''
      >

        <div className="form-group pb3">
          <div className={`group-item ${passwordError && 'has-error'}`}>
            <label htmlFor="password">Password</label>
            <input
              ref={password}
              type="password"
              data-type="password"
              name="password"
              max-length="40"
              defaultValue="1234"
              onChange={() => {
                setUsernameError(false);
                setErrorMessage(null);
              }}
            />
          </div>
        </div>

        <div className="form-group pb3">
          <div className={`group-item ${passwordError && 'has-error'}`}>
            <label htmlFor="password">Repeat Password</label>
            <input
              ref={passwordRepeat}
              type="password"
              data-type="password"
              name="password"
              max-length="40"
              defaultValue="1234"
              onChange={() => {
                setPasswordError(false);
                setErrorMessage(null);
              }}
            />
          </div>
        </div>

        { passwordError &&
          <div className="form-error mb3">
              <span className="error-message">{errorMessage}</span>
          </div>
        }

        <button
          className="btn btn--secondary"
          onClick={validatePassword}
        >
          Update
        </button>

    </form>

    <Logout/>
    </>

  )
}

export default SettingsAccount
