
import React from 'react'

import { TouchableHighlight, View, Text, StyleSheet } from 'react-native'
import { Buttons, Colors, Typography } from './../../styles'

const Badge = ( { status, count } ) => {

  return (
    <>
      {status === "review" &&
        <Text style={styles.badgeReview} numberOfLines={1}>Review</Text>
      }
      {status === "completed" &&
        <Text style={styles.badgeCompleted} numberOfLines={1}>Fertig</Text>
      }
      {status === "not_started" &&
        <Text style={styles.badgeInProgress} numberOfLines={1}>Noch nicht angefangen</Text>
      }
      {status === "in_progress" &&
        <Text style={styles.badgeInProgress} numberOfLines={1}>In Arbeit</Text>
      }
    </>
  )

}

export default Badge

const styles = StyleSheet.create({
  badgeReview: {
    ...Typography.badge,
    ...Colors.textBrand,
    ...Buttons.badgeReview,
  },
  badgeCompleted: {
    ...Typography.badge,
    ...Buttons.badgeCompleted,
  },
  badgeNotStarted: {
    ...Typography.badge,
    ...Buttons.badgeNotStarted,
  },
  badgeInProgress: {
    ...Typography.badge,
    ...Buttons.badgeInProgress,
  },
})
