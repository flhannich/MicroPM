import React, { useContext, useState } from 'react'
import { ScrollView, Text, StyleSheet, TextInput } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Spacing, Typography, Forms } from './../styles'
import { ButtonPrimary } from './../components'

import { AuthContext } from '../context/AuthContext.js'

export default function Contact( data ) {

  const navigation = data.navigation;

  return(
    <>

    <ScrollView style={styles.container}>

      <Text style={styles.title}>Contact</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => this.setState({text})}
      />
      <TextInput
        multiline={true}
        style={styles.input}
        numberOfLines={4}
        onChangeText={(text) => this.setState({text})}
      />

      <ButtonPrimary
        target={() => navigation.navigate('Feedback', { item: data }) }
        text='Send'
      />

    </ScrollView>

    </>
  )
}

const styles = StyleSheet.create({
  container: {
    ...Spacing.container,
    flex: 1,
  },
  title: {
    ...Typography.title,
  },
  input: {
    ...Forms.input,
    ...Typography.input,
    marginTop: Spacing.p2,
    marginBottom: Spacing.p4,
  },
})
