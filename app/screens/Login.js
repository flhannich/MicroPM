import React, { useState, useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, StyleSheet, TextInput, SafeAreaView } from 'react-native'

import { ButtonPrimary } from './../components'

import { Colors, Typography, Spacing, Forms } from './../styles'

export default function Login( probs ) {

  const handleSubmit = () => {
    probs.setErrorMessage(false)
  }

  return(

      <View style={styles.container}>
       <Text style={styles.label}>Username</Text>
       <TextInput
         style={styles.input}
         placeholder='admin'
         onChangeText={text => probs.setUsername(text)}
       />
       <Text style={styles.label}>Password</Text>
       <TextInput
         style={styles.input}
         placeholder='1234'
         onChangeText={text => probs.setPassword(text)}
       />
       {probs.errorMessage &&
         <Text style={styles.errorMessage}>{probs.errorMessage}</Text>
       }
       <ButtonPrimary
         target={probs.validate}
         text='Log in'
       />
     </View>

  )

}




const styles = StyleSheet.create({
  container: {
    marginTop: Spacing.p8,
    ...Spacing.container,
    ...Colors.container,
  },
  info: {
    ...Forms.label,
    ...Typography.label,
    ...Colors.textLight,
    marginBottom: Spacing.p4,
  },
  errorMessage: {
    ...Forms.label,
    ...Typography.label,
    ...Colors.textError,
    marginBottom: Spacing.p3,
    backgroundColor: '#FFE7E6',
    paddingHorizontal: Spacing.p3,
    paddingVertical: Spacing.p2,
    borderRadius: 5,
  },
  label: {
    ...Forms.label,
    ...Typography.label,
    ...Colors.textLight,
  },
  input: {
    ...Forms.input,
    ...Typography.input,
    marginTop: Spacing.p2,
    marginBottom: Spacing.p4,
  },
})
