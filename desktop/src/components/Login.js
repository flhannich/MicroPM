import React, { useState, useContext } from 'react'

import { AuthContext } from './../context/AuthContext.js'

const Login = () => {

  const context = useContext(AuthContext);

  const [url, setUrl] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [urlError, setUrlError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [usernameError, setUsernameError] = useState(false)
  const [errorMessage, setErrorMessage] = useState([])
  const [isLoading, setLoading] = useState(true)


  // FIX Correct Response if Url is not Correct

  const _login = () => {
    fetch("http://192.168.178.35:8000/api/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: JSON.stringify({username: 'admin', password: '1234'})
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
          window.ipcRenderer.send('TOKEN', json.remember_token)
          context.setToken(json.remember_token)
          console.log('logged in')
        }
      })
      .catch((error) => setErrorMessage(error))
  }



  const validateForm = event => {
    event.preventDefault();
    setErrorMessage([]);

    // let a = validateUsername(username)
    // let b = validateUrl(url)
    // let c = validatePassword(password)
    //
    // if(a && b && c) {
      _login();
    // }

  }

  const validateUrl = (val) => {
    if(!val.match(/^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/)) {
      setUrlError(true)
      setErrorMessage(prevState => ([
        ...prevState, 'Somethings wrong about your Url'
      ]))
      return false;
    } else {
      return true;
    }
  }


  const validateUsername = (val) => {
    if(!val.match(/\s/)) {
      setUsernameError(true)
      setErrorMessage(prevState => ([
        ...prevState, 'Somethings wrong about your Username'
      ]))
      return false;
    } else {
      return true;
    }
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
    <>

    <form
      className={`contact-form ${errorMessage !== '' && 'has-error'}`}
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
            onChange={el => {setPassword(el.target.value); setPasswordError(false)}}
          />
        </div>
      </div>


      <div className="form-group pb4">
        <div className={`group-item ${urlError && 'has-error'}`}>
          <label htmlFor="url">Your Api</label>
          <input
            type="text"
            data-type="url"
            name="url"
            max-length="200"
            placeholder="https://example.com/api"
            onChange={el => {setUrl(el.target.value); setUrlError(false)}}
            />
        </div>
      </div>


      <div className="form-group pb3">
        <div className="group-item">
          <button
            type="submit"
            onClick={validateForm}
          >Submit</button>
        </div>
      </div>

      { errorMessage.length !== 0 &&
        <div className="form-error mt3">
            <span className="error-message">{errorMessage}</span>
        </div>
      }

    </form>


    </>
  )
}

export default Login
