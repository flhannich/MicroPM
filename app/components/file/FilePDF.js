import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

import { Ionicons } from '@expo/vector-icons';

import { Icons, Typography, Files, Spacing, Colors } from './../../styles'

const FilePDF = ({item}) => {

  return (

    <>
      {item.map((item, index) => (
        <View key={item}>
        <View style={styles.document}>
          <Ionicons
            style={styles.documentIcon}
            name="ios-document"
            size={24}
            color='rgba(0,0,0,.30)'
          />
        <Text>{item.name}</Text>
       </View>
       <Text style={styles.documentDescription}>{item.description}</Text>
       </View>
     ))}
    </>

  )
}

export default FilePDF

const styles = StyleSheet.create({
  documentDescription: {
    marginBottom: Spacing.p6,
    borderBottomColor: Colors.borderLight,
    borderBottomWidth: 1,
    paddingBottom: Spacing.p4,
    ...Typography.description,
  },
  document: {
    display: 'flex',
    flexDirection:"row",
    alignItems: 'center',
    marginBottom: Spacing.p5,
  },
  documentIcon: {
    marginRight: Spacing.p3,
  }
});
