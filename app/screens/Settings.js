import React, { useContext, useState } from 'react'
import { Button, Text, View, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AppContext } from '../context/AppContext.js'

export default function Settings() {

  const {id, isValidated, _logout} = useContext(AppContext);

  return(
    <View style={styles.screen}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.id_title}>Your ID</Text>
      <Text style={styles.id}>{id}</Text>
      <Button
        style={styles.button}
        onPress={_logout}
        title="Log out"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    marginTop: 40,
    alignItems: 'center',
  },
  button: {
    color: '#000',
    paddingTop: 6,
    paddingBottom: 32,
  },
  id_title: {
    paddingTop: 40,
  },
  id: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingTop: 6,
    paddingBottom: 32,
  },
  title: {
    padding: 20,
    fontSize: 24,
  }
})
