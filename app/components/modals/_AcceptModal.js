import React, { useState } from 'react'
import { Text, TouchableHighlight, View, StyleSheet, Modal } from 'react-native'

import { Ionicons } from '@expo/vector-icons';

import { Icons, Typography, Files, Spacing, Cards, Colors } from './../../styles'

const AcceptModal = ({item, state, setState}) => {

  console.log(state);

return (

  <Modal
      animationType="slide"
      transparent={true}
      visible={state}
      onRequestClose={() => {
        console.log("Modal has been closed.");
      }}
    >
      <View>
        <View>
          <Text>Hello Modal!</Text>

          <TouchableHighlight
            onPress={() => {
              setState(false);
            }}
          >
            <Text>Hide Modal</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>

  )

}

export default AcceptModal

const styles = StyleSheet.create({
  name: {
    marginBottom: Spacing.p4,
    ...Colors.textLightest,
  },
})
