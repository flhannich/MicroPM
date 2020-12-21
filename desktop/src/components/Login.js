import React, { useState, useContext } from 'react'

import { AuthContext } from './../context/AuthContext.js'
import { AppContext } from './../context/AppContext.js'

const Login = () => {

  const auth = useContext(AuthContext);
  const app = useContext(AppContext);

  const [api, setApi] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [apiError, setApiError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [usernameError, setUsernameError] = useState(false)
  const [errorMessage, setErrorMessage] = useState([])

  // FIX Correct Response if Url is not Correct

  const _login = () => {
    fetch(`${api}/api/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: JSON.stringify({username: username, password: password})
      })
      .then((response) => response.json())
      .then((json) => {
        if (json.message !== undefined) {
          if(json.message === '') {
            setErrorMessage('Your Api does not respsonse')
          } else {
            setErrorMessage(json.message)
          }
        } else {
          window.ipcRenderer.send('TOKEN', {
            token: json.remember_token,
            api: api,
            username: username
          })
          auth.setToken(json.remember_token)
          auth.setUsername(username)
          app.setApi(api)
        }
      })
      .catch((error) => setErrorMessage(error))
  }



  const validateForm = event => {
    event.preventDefault();
    setErrorMessage([]);

    let a = validateUsername(username)
    let b = validateUrl(api)
    let c = validatePassword(password)

    if(a && b && c) {
      _login();
    }

  }

  const validateUrl = (val) => {
    // if(!val.match(/^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/)) {
    //   setApiError(true)
    //   setErrorMessage(prevState => ([
    //     ...prevState, 'Somethings wrong about your Url'
    //   ]))
    //   return false;
    // } else {
      return true;
    // }
  }


  const validateUsername = (val) => {
    // if(!val.match(/\s/)) {
    //   setUsernameError(true)
    //   setErrorMessage(prevState => ([
    //     ...prevState, 'Somethings wrong about your Username'
    //   ]))
    //   return false;
    // } else {
      return true;
    // }
  }


  const validatePassword = (val) => {
    if(val.length < 4) {
      setPasswordError(true)
      setErrorMessage(prevState => ([
        ...prevState, 'Somethings wrong about your Password'
      ]))
      return false;
    } else {
      return true;
    }
  }


  // const validateEmail = (val) => {
  //
  //   if(val !== '') {
  //     var reg = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  //
  //     (!val.match(reg))
  //       ? setErrorMessage('Please enter your first and last name')
  //       : setUsername(val)
  //   } else {
  //     setErrorMessage('')
  //   }
  // }



  return (
    <div className="container">

    <form
      className={`contact-form pt4 pb4 ${errorMessage !== '' && 'has-error'}`}
      action=""
      >

      <div className="form-group pb3">
        <div className={`group-item ${usernameError && 'has-error'}`}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            data-type="username"
            name="username"
            max-length="40"
            placeholder="Charlie Chaplin"
            defaultValue="admin"
            onChange={el => {setUsername(el.target.value); setUsernameError(false)}}
          />
        </div>
      </div>

      <div className="form-group pb3">
        <div className={`group-item ${passwordError && 'has-error'}`}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            data-type="password"
            name="password"
            max-length="40"
            defaultValue="1234"
            onChange={el => {setPassword(el.target.value); setPasswordError(false)}}
          />
        </div>
      </div>


      <div className="form-group pb4">
        <div className={`group-item ${apiError && 'has-error'}`}>
          <label htmlFor="api">Api URL</label>
          <input
            type="text"
            data-type="url"
            name="api"
            max-length="100"
            defaultValue="http://192.168.178.121:8000"
            onChange={el => {setApi(el.target.value); setApiError(false)}}
          />
        </div>
      </div>


      <div className="form-group pb3">
        <div className="group-item">
          <button
            className="btn btn--primary"
            type="submit"
            onClick={validateForm}
          >Login</button>
        </div>
      </div>

      { errorMessage.length !== 0 &&
        <div className="form-error mt3">
            <span className="error-message">{errorMessage}</span>
        </div>
      }

    </form>


    </div>
  )
}

export default Login
