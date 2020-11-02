import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

import { Ionicons } from '@expo/vector-icons';

import { Icons, Typography, Files, Spacing, Cards, Colors } from './../../styles'

const FileLink = ({item}) => {

  return (

    <>
      {item.map((item, index) => (
        <View key={item}>
          <View style={styles.cardFile}>
            <Ionicons
              style={styles.cardIcon}
              name="ios-attach"
              size={24}
              color='rgba(0,0,0,.30)'
            />
          <Text>{item.name}</Text>
         </View>
         <Text style={styles.description}>{item.description}</Text>
       </View>
     ))}
    </>

  )
}

export default FileLink

const styles = StyleSheet.create({
  description: {
    marginBottom: Spacing.p6,
    ...Typography.description,
  },
  cardFile: {
    ...Cards.cardFile,
    marginBottom: Spacing.p4,
  },
  cardIcon: {
    marginRight: Spacing.p3,
  }
});
