import React, { useState, createContext, useEffect, useReducer } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Text, View, TextInput, ActivityIndicator } from 'react-native'
import { StatusBar } from 'expo-status-bar'; //check for bundle size issues

import MainNavigation from './navigation/MainNavigation';
import Login from './screens/Login';

import { AuthContext } from './context/AuthContext.js'
import { ReviewContext } from './context/ReviewContext.js'

export default function App() {


  const [id, setId] = useState('');
  const [isValidated, setIsValidated] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [reviews, setReviews] = useState('test');

  const _validate = () => {

      // fetch(`http://192.168.178.83:8000/api/client/${id}`)
      //   .then((response) => response.json())
      //   .then((json) => setData(json))
      //   .catch((error) => console.error(error))
      //   .finally(() => setIsValidated(true));

      if(id !== '') {
        setIsValidated(true);
        _store();
      } else {
        setErrorMessage('Please enter your ID')
      }
      // if not ->
  }

  const _logout = () => {
    AsyncStorage.clear();
    setIsValidated(false);
    setId('');
  }

  const _store = async () => {
    try {
      await AsyncStorage.setItem(
        'id', id
      );
    } catch (error) {
    }
  };

  const _getStoredId = async () => {
    try {
      const storedValue = AsyncStorage.getItem('id');
      if(storedValue !== null) {
        return storedValue;
      }
    } catch (error) {
    }
  };

  useEffect(() => {
    _getStoredId().then((result) => {
      if(result !== null) {
        setIsValidated(true);
        setId(result);
      }
    })
  }, []);


//192.168.178.83 mbpro
//192.168.178.35 imac
// php artisan serve --host=192.168.178.35 --port=8000
// php artisan serve --host=192.168.178.83 --port=8000


  return(

    <AuthContext.Provider value={{id, _logout}}>
      <ReviewContext.Provider value={{reviews, setReviews}}>

      {isValidated

        ?  <MainNavigation />
        :  <Login
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
              setId={setId}
              validate={_validate}
            />

      }

      <StatusBar style="dark" />

      </ReviewContext.Provider>
    </AuthContext.Provider>

  )
}
