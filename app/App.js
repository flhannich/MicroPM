import React, { useState, useContext, createContext, useEffect, useReducer } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Button, Text, View, TextInput, ActivityIndicator } from 'react-native'
import { StatusBar } from 'expo-status-bar' //check for bundle size issues

import MainNavigation from './navigation/MainNavigation'
import Login from './screens/Login'

import { AuthContext } from './context/AuthContext.js'

export default function App() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState('')

  const [isValidated, setIsValidated] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)
  const [isLoading, setLoading] = useState(true)

  const _validate = () => {
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
          setErrorMessage(json.message)
        } else {
          setToken(json.remember_token)
          _storeData(json.remember_token, username)
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setIsValidated(true))
  }

  const _logout = () => {
    fetch(`http://192.168.178.35:8000/api/logout`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'authorization': token,
        }
      })
      .then((response) => response.json())
      .then((json) => {
        AsyncStorage.clear()
        setToken('')
      })
      .catch((error) => console.error(error))
      .finally(() => setIsValidated(false))
  }

  // CHANGE FOR KEYRING
  const _storeData = async (token, username) => {
    console.log(username);
    try {
      await AsyncStorage.multiSet(
        [['token', token], ['username', username]]
      );
    } catch (error) {
    }
  }

  const _getStoredData = async () => {
    try {
      await AsyncStorage.multiGet(['token', 'username']).then(response => {
        if(response[0][1] !== null && response[1][1] !== null) {
          setToken(response[0][1]);
          setUsername(response[1][1]);
          setIsValidated(true);
          setErrorMessage('');
        } else {
          setErrorMessage('Whoops, something went wrong. Try again.')
        }
      })
    } catch (error) {
    }
  }






  useEffect(() => {
    _getStoredData()
  }, [])

//192.168.178.83 mbpro
//192.168.178.35 imac
// php artisan serve --host=192.168.178.35 --port=8000
// php artisan serve --host=192.168.178.83 --port=8000


  return(

    <AuthContext.Provider value={{username, token, _logout}}>

      {isValidated

        ?  <MainNavigation />
        :  <Login
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
              setPassword={setPassword}
              setUsername={setUsername}
              validate={_validate}
            />

      }

      <StatusBar style="dark" />

      </AuthContext.Provider>

  )
}
