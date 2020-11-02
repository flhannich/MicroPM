
import React from 'react'

import { TouchableHighlight, View, Text, StyleSheet } from 'react-native'
import { Buttons, Colors } from './../../styles'


const ButtonSecondary = ( { target, text } ) => {

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

export default ButtonSecondary

const styles = StyleSheet.create({
  button: {
    ...Buttons.secondary,
  },
  buttonText: {
    ...Colors.textBrand,
  }
})
