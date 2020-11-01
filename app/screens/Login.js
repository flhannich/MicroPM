import React, { useState, useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Text, View, StyleSheet, TextInput, SafeAreaView } from 'react-native'

import { AuthContext } from './../context/AuthContext.js'

import { Colors, Typography, Spacing, Forms } from './../styles'

export default function Login( probs ) {

  const handleSubmit = () => {
    probs.setErrorMessage(false)
  }

  return(

      <View style={styles.container}>
       <Text style={styles.label}>Your Secret</Text>
       <TextInput
         style={styles.input}
         onChangeText={text => probs.setId(text)}
       />
       {probs.errorMessage &&
         <Text style={styles.errorMessage}>{probs.errorMessage}</Text>
       }
       <Button
         onPress={probs.validate}
         title="Log in"
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
