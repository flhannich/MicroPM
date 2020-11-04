import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

import { Ionicons } from '@expo/vector-icons';

import { Icons, Files, Spacing } from './../../styles'

const FilePreview = ({item}) => {

  return (
    <View
      style={styles.icon}
    >
        <Ionicons
          name="ios-attach"
          size={20}
          color='rgba(0,0,0,.30)'
        />
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
