import React, { useState, useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Text, View, StyleSheet, TextInput } from 'react-native'

import MainNavigation from './../navigation/MainNavigation';

import { AppContext } from './../context/AppContext.js'

export default function Login( probs ) {

  const { isValidated } = (useContext(AppContext));

  
  return(
    <>
    {!isValidated &&
      <View style={styles.screen}>
       <Text style={styles.text}>Enter your ID </Text>
       <TextInput
         style={styles.input}
         onChangeText={text => probs.setId(text)}
       />
       {probs.errorMessage &&
         <Text style={styles.error}>{probs.errorMessage}</Text>
       }
       <Button
         styles={styles.button}
         onPress={probs.validate}
         title="View your Status"
       />
     </View>
     }
  </>
  )

}


const styles = StyleSheet.create({
  screen: {
    marginTop: 40,
    alignItems: 'center',
  },
  text: {
    paddingTop: 32,
    paddingBottom: 24,
    fontSize: 13
  },
  error: {
    paddingTop: 0,
    paddingBottom: 24,
    fontSize: 13,
    color: 'red'
  },
  input: {
    width: 200,
    fontSize: 16,
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#777',
    marginBottom: 32
  },
})
