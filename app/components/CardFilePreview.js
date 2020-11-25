import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

import { Ionicons } from '@expo/vector-icons';

import { Icons, Files, Spacing, Colors, Typography } from './../styles'

const CardFilePreview = ({ count }) => {
  return (

        <View style={styles.icon} >
          <Ionicons
            name="ios-attach"
            size={20}
            color='rgba(0,0,0,.30)'
          />
        </View>

  )
}

export default CardFilePreview

const styles = StyleSheet.create({
  icon: {
    ...Icons.file,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: Spacing.p2,
  },
  count: {
    ...Typography.description,
    marginLeft: Spacing.p1,
    ...Colors.textLightest,
  }
});
