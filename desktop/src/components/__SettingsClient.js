import { useState, useRef } from 'react';
import { Logout } from './'

const SettingsClient = ({ data }) => {

  console.log(data);
  
const username = useRef();
const password = useRef();
const passwordRepeat = useRef();

const [errorMessage, setErrorMessage] = useState(null);
const [usernameError, setUsernameError] = useState(false);
const [passwordShown, setPasswordShown] = useState(false);
const [passwordError, setPasswordError] = useState(false);

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

        <div className="form-group pb3">
          <label htmlFor="username">Username</label>
          
          <input
            ref={username}
            type="text"
            data-type="username"
            name="username"
            max-length="40"
            placeholder="Charlie Chaplin"
            defaultValue={data !== null ? data.username : 'Username'}
            />
        </div>

        <div className="form-group pb3">
          <label htmlFor="password">Password</label>

          <div className="password-input-wrapper">
            <input
              ref={password}
              type={passwordShown ? "text" : "password"}
              data-type="password"
              name="password"
              max-length="40"
              defaultValue={data !== null ? data.secret : ''}
              onChange={() => {
                setUsernameError(false);
                setErrorMessage(null);
              }}
            />
            <button
              className="btn btn--icon"
              onClick={() => {setPasswordShown(!passwordShown)}}
            >
              T
            </button>
          </div>

          { passwordError &&
            <div className="form-error mb3">
                <span className="error-message">{errorMessage}</span>
            </div>
          }

          <button
            className="btn btn--secondary mt3"
            onClick={validatePassword}
          >
            Update
          </button>
        </div>
       
    </>

  )
}

export default SettingsClient
