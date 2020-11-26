import React from 'react'
import { Text, TouchableHighlight, View, StyleSheet, Modal, Image, ScrollView } from 'react-native'

import { Ionicons } from '@expo/vector-icons';

import { Icons, Typography, Files, Spacing, Cards, Colors, Shadows } from './../../styles'

const ImageModal = ({state, setState, index, data}) => {

let res = data.filter(x => x.type === 'image');
console.log(state)
console.log(index)
return (

  <Modal
      transparent={true}
      visible={state}

      onRequestClose={() => {
        console.log("Modal has been closed.");
      }}
    >
      <View style={styles.container}>
        <View>
          <TouchableHighlight
            style={styles.close}
            onPress={() => {
              setState(false);
            }}
            underlayColor="transparent"
          >
            <Ionicons
              name="ios-close"
              color='#000'
              size={32}
            />
          </TouchableHighlight>


          <View style={styles.imageHolder}>
            {res.map((item, index) =>
              <Image
                key={index}
                style={styles.image}
                source={{uri: item.path}}
              />
            )}
          </View>

        </View>
      </View>

    </Modal>

  )

}

export default ImageModal

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: '#fff',
    alignSelf: 'center',
    width: '95%',
    height: '88.5%',
    marginTop: '10%',
    borderRadius: 5,
    borderWidth: 0,
    borderWidth: 1,
  },
  close: {
    position: 'absolute',
    top: 32,
    right: 24,
    marginTop: -Spacing.p5,
    marginRight: -Spacing.p3,
    padding: Spacing.p3,
    zIndex: 1,
  },
  imageHolder: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    overflow: 'hidden',
  },
  image: {
    minWidth: '100%',
    height: '100%',
    flex: 1,
    resizeMode: 'contain',
  }
})
