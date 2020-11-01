import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

import { Ionicons } from '@expo/vector-icons';

import { Icons, Files, Spacing } from './../styles'

const FilePreview = ({item}) => {

  return (
    <View
      style={styles.icon}
    >
      {item.type === 'pdf' &&
        <Ionicons
          name="ios-document"
          size={20}
          color='rgba(0,0,0,.30)'
        />
      }
      {item.type === 'jpg' &&
        <Ionicons
          name="ios-image"
          size={20}
          color='rgba(0,0,0,.30)'
        />
      }
      {item.type === 'zip' &&
        <Ionicons
          name="ios-archive"
          size={20}
          color='rgba(0,0,0,.30)'
        />
      }
    </View>
  )
}

export default FilePreview

const styles = StyleSheet.create({
  icon: {
    ...Icons.file,
    marginRight: Spacing.p2,
  }
});
