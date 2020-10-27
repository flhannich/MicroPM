import React, { useState, useEffect, createContext, useContext, useReducer } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AppContext } from './AppContext.js'

export const AppContextProvider = ( { children } ) => {

  const [id, setId] = useState('');
  const [isValidated, setIsValidated] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  console.log(id);
  console.log(isValidated);
  console.log(errorMessage);
  const _validate = () => {
      // fetch from api if exists ->
      setIsValidated(true);
      _store();
      // if not ->
      //  setErrorMessage('Your ID doesnt exist')
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
        setId(res);
        setIsValidated(true);
      }
    })
  }, [])

  const reducer = (state, pair) => ({ ...state, ...pair })

  const initialState = {
  	id: '',
    isValidated: false,
    errorMessage: false,
  }
  const [state, update] = useReducer(reducer, initialState)


  return (

      <AppContext.Provider value={{ id, isValidated, update }} >
        {children}
      </AppContext.Provider>

  )

}
