import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

import { Ionicons } from '@expo/vector-icons';

import { Icons, Typography, Files, Spacing, Cards, Colors } from './../../styles'

const FilePDF = ({item}) => {

  return (

        <View>
          <View style={styles.cardFile}>
            <Ionicons
              style={styles.cardIcon}
              name="ios-document"
              size={24}
              color='#007AFF'
            />
          <Text style={styles.cardName}>{item.name}</Text>
         </View>
       </View>

  )
}

export default FilePDF

const styles = StyleSheet.create({
  description: {
    marginBottom: Spacing.p6,
    ...Typography.description,
  },
  cardName: {
    ...Typography.fileTitle,
    ...Colors.textBrand,
  },
  cardFile: {
    ...Cards.cardFile,
    marginBottom: Spacing.p3,
  },
  cardIcon: {
    marginRight: Spacing.p3,
  }
});
