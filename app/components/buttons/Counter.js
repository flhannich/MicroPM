
import React from 'react'

import { TouchableHighlight, View, Text, StyleSheet } from 'react-native'
import { Buttons, Colors, Typography, Spacing } from './../../styles'

const Counter = ( { status, count } ) => {
  console.log(status)
  console.log(count)
  return (
    <>
      {status === "review" &&
        <Text style={styles.badgeCounterReview} numberOfLines={1}>{count}</Text>
      }
      {status === "task" &&
        <Text style={styles.badgeCounterTask} numberOfLines={1}>{count}</Text>
      }
    </>
  )

}

export default Counter

const styles = StyleSheet.create({
  badgeCounterReview: {
    ...Typography.badge,
    ...Colors.textBrand,
    ...Buttons.badgeCounterReview,
    marginLeft: Spacing.p1,
  },
  badgeCounterTask: {
    ...Typography.badge,
    ...Buttons.badgeCounterTask,
    marginLeft: Spacing.p1,
  },
})
