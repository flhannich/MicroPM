import React, { useState } from 'react'
import { Text, TouchableHighlight, View, StyleSheet, Modal } from 'react-native'

import { Ionicons } from '@expo/vector-icons';

import { Icons, Typography, Files, Spacing, Cards, Colors, Shadows } from './../../styles'

import { ButtonPrimary } from './../'

const AcceptModal = ({item, state, setState}) => {

  console.log(state);

return (

  <Modal
      transparent={true}
      visible={state}
      onRequestClose={() => {
        console.log("Modal has been closed.");
      }}
    >
      <View
        style={styles.modal}
      >
        <View>

          <TouchableHighlight
            style={styles.modalClose}
            onPress={() => {
              setState(false);
            }}
            underlayColor="transparent"
          >
            <Ionicons
               style={styles.icon}
              name="ios-close"
              color='#000'
              size={48}
            />
          </TouchableHighlight>

        </View>
      </View>
    </Modal>

  )

}

export default AcceptModal

const styles = StyleSheet.create({
  modal: {
    position: 'relative',
    backgroundColor: '#fff',
    alignSelf: 'center',
    width: '95%',
    height: '50%',
    marginTop: '40%',
    padding: Spacing.p3,
    borderRadius: 5,
    ...Colors.textLightest,
    ...Shadows.large,
  },
  modalClose: {
    position: 'absolute',
    top: 0,
    right: 0,
    marginTop: -Spacing.p5,
    marginRight: -Spacing.p3,
    padding: Spacing.p3,
  }
})
