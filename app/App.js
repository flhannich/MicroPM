import React, { useState, createContext, useEffect, useReducer } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Text, View, TextInput, ActivityIndicator } from 'react-native'
import { StatusBar } from 'expo-status-bar'; //check for bundle size issues

import MainNavigation from './navigation/MainNavigation';
import Login from './screens/Login';

import { AuthContext } from './context/AuthContext.js'
import { ReviewContext } from './context/ReviewContext.js'

export default function App() {


  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [isValidated, setIsValidated] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [reviews, setReviews] = useState('');

  const _validate = () => {
    fetch("http://192.168.178.35:8000/api/client/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: JSON.stringify({username: username, password: password})
      })
      .then((response) => response.json())
      .then((json) => {
        if (json.message !== undefined) {
          setErrorMessage(json.message)
        } else {
          setToken(json.remember_token),
          setIsValidated(true),
          _storeToken(json.remember_token);
        }
      })
      .catch((error) => console.error(error))
  }


  const _logout = () => {
    fetch(`http://192.168.178.35:8000/api/client/logout`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'authorization': token,
        }
      })
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        AsyncStorage.clear();
        setIsValidated(false);
        setToken('');
      })
      .catch((error) => console.error(error))
  }

  // CHANGE FOR KEYRING
  const _storeToken = async (value) => {
    try {
      await AsyncStorage.setItem(
        'token', value
      );
    } catch (error) {
    }
  };

  const _getToken = async () => {
    try {
      let value = AsyncStorage.getItem('token');
      if(value !== null) {
        return value;
      }
    } catch (error) {
    }
  };

  useEffect(() => {
    _getToken().then((result) => {
      if(result !== null) {
        setToken(result);
        setIsValidated(true);
      }
    })
  }, []);

//192.168.178.83 mbpro
//192.168.178.35 imac
// php artisan serve --host=192.168.178.35 --port=8000
// php artisan serve --host=192.168.178.83 --port=8000


  return(

    <AuthContext.Provider value={{token, _logout}}>
      <ReviewContext.Provider value={{reviews, setReviews}}>

      {isValidated

        ?  <MainNavigation reviews={reviews} />
        :  <Login
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
              setPassword={setPassword}
              setUsername={setUsername}
              validate={_validate}
            />

      }

      <StatusBar style="dark" />

      </ReviewContext.Provider>
    </AuthContext.Provider>

  )
}
