import React, { useState, createContext, useEffect, useReducer } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Text, View, TextInput } from 'react-native'

import MainNavigation from './navigation/MainNavigation';
import Login from './screens/Login';

import { AppContext } from './context/AppContext.js'

export default function App() {

  const [id, setId] = useState('');
  const [isValidated, setIsValidated] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const _validate = () => {
      // fetch from api if exists ->
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

  const _get = async () => {
    try {
      const storedValue = AsyncStorage.getItem('id');
      if(storedValue !== null) {
        return storedValue;
      }
    } catch (error) {
    }
  };

  useEffect(() => {
    _get().then((res) => {
      if(res !== null) {
        setIsValidated(true);
        setId(res);
      }
    })
  }, []);


  return(

      <AppContext.Provider value={{id, isValidated, _logout}}>
         <MainNavigation />
         <Login
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            setId={setId}
            validate={_validate}
          />
      </AppContext.Provider>

  )
}
