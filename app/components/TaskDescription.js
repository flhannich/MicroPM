
import React from 'react'

import { Text, View, StyleSheet } from 'react-native'
import { Colors, Typography, Spacing } from './../styles'

const TaskDescription = ( { body, title } ) => {

  return (

    <View style={{marginBottom: Spacing.p6}}>

      <View style={{marginBottom: Spacing.p2}}>
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.descriptionBody}>
        <Text style={styles.description}>{body}</Text>
      </View>
    </View>

  )

}

export default TaskDescription

const styles = StyleSheet.create({
  title: {
    ...Typography.subTitle,
    ...Colors.textLightest,
  },
  descriptionBody: {
    paddingBottom: Spacing.pb5
  },
  description: {
    ...Typography.body,
    ...Colors.textNormal,
  },
})
