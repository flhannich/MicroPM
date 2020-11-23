import React, { useState, useEffect } from 'react'
import { TouchableHighlight, Text, View, StyleSheet } from 'react-native'

import { format } from "date-fns";
import { de } from 'date-fns/locale'
import formatDistance from 'date-fns/formatDistance'

const elapsedTime = (time) => {
  return formatDistance( new Date(Date.parse(time)), new Date(), { addSuffix: true, locale: de });
}

import { Colors, Typography, Spacing, Forms, Cards, Files, Buttons } from './../../styles'
import { Counter, Badge } from './../../components'

const CardProject = ({item, navigation}) => {

// const [progress, setProgress] = useState(null)


const hasReviews = item.tasks.filter(item => item.is_review === '1' && item.is_accepted === '0')

// useEffect(() => {
//   let completed = null;
//   let total = null;
//
//   item.tasks.forEach((item, i) => {
//     if(item.weight !== null && item.status === 'completed') {
//       completed += parseInt(item.weight);
//     }
//     if(item.weight !== null) {
//       total += parseInt(item.weight);
//     }
//   });
//
//   let res = Math.round(completed / total * 100);
//
//   setProgress(res);
//
//
//   // <View style={styles.progressBarWrapper}>
//   //   <View style={styles.progressBarBackground}></View>
//   //   <View style={[styles.progressBarActive, progressWidth]}></View>
//   // </View>
//
//
// }, [])


// const progressWidth = { width: progress + '%' };

  return (
      <TouchableHighlight
        onPress={() => navigation.navigate('Project', { item: item }) }
        underlayColor="white"
      >
        <View style={styles.cardProject}>
          <View style={styles.cardTitle}>
            <Text style={styles.title}>{item.name}</Text>
            <View style={styles.countWrapper}>
              {hasReviews.length > 0 &&
                <Badge status='review' />
              }
              {item.status !== 'completed' && item.tasks.length > 0 &&
                <Counter status={'task'} count={item.tasks.length} />
              }
              {item.status === 'completed' &&
                <Badge status={item.status} />
              }
            </View>
          </View>
          <View style={styles.meta}>
            <Text style={styles.info}>{elapsedTime(item.updated_at)}</Text>
          </View>
        </View>
      </TouchableHighlight>
  )
}

export default CardProject;



const styles = StyleSheet.create({
  cardProject: {
    ...Cards.cardProject,
    marginBottom: Spacing.p3,
  },
  cardTitle: {
    ...Cards.cardTitle,
    paddingRight: Spacing.p1,
  },
  countWrapper: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  title: {
    ...Typography.cardTitle,
  },
  progressBarWrapper: {
    marginBottom: Spacing.p2,
  },
  progressBarActive: {
    height: 4,
    width: '50%',
    backgroundColor: Colors.brand,
    borderRadius: 2.5,
  },
  progressBarBackground: {
    position: 'absolute',
    height: 4,
    width: '100%',
    backgroundColor: '#ddd',
    borderRadius: 2.5,
  },
  badgeReview: {
    ...Typography.badge,
    ...Colors.textBrand,
    ...Buttons.badgeReview,
  },
  meta: {
    ...Files.container,
    marginTop: Spacing.p1,
  },
  info: {
    ...Typography.info,
    ...Colors.textLight,
  },
})
