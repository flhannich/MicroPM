
import React from 'react'

import { TouchableHighlight, View, Text, StyleSheet } from 'react-native'
import { Buttons, Colors } from './../../styles'


const ButtonPrimary = ( { target, text } ) => {

  return (
    <View style={styles.header}>
      <TouchableHighlight
        style={styles.button}
        onPress={target}
        underlayColor="white"
      >
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableHighlight>
    </View>
  )

}

export default ButtonPrimary

const styles = StyleSheet.create({
  button: {
    ...Buttons.primary,
  },
  buttonText: {
    ...Colors.textWhiteFull,
  }
})
