import React, { useContext, useState } from 'react'
import { Button, Text, View, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Spacing } from './../styles'

import { ButtonPrimary } from './../components'

import { AuthContext } from '../context/AuthContext.js'

export default function Settings() {

  const {_logout} = useContext(AuthContext);

  return(
    <View style={styles.container}>
      <ButtonPrimary
        target={_logout}
        text='Log out'
      />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    ...Spacing.container,
    flex: 1,
  },
})
