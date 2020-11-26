import React, { useState, useEffect } from 'react'
import { TouchableHighlight, Text, View, StyleSheet } from 'react-native'

import { Colors, Typography, Spacing, Forms, Cards, Files, Buttons } from './../styles'
import { Counter, Badge } from './'

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

// <View style={styles.descriptionWrapper}>
//   <Text style={styles.description}>{item.description}</Text>
// </View>

// const progressWidth = { width: progress + '%' };

  return (
      <TouchableHighlight
        onPress={() => navigation.navigate('Project', { item: item }) }
        underlayColor="white"
         style={styles.cardProject}
      >
      <>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>{item.name}</Text>
          </View>


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


          </>
      </TouchableHighlight>
  )
}

export default CardProject;



const styles = StyleSheet.create({
  cardProject: {
    width: '47.5%',
    aspectRatio: 1,
    borderRadius: 5,
    padding: Spacing.p3,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: Colors.borderLight,
    marginBottom: Spacing.p3,
  },
  titleWrapper: {
    marginBottom: Spacing.p1,
  },
  title: {
    ...Typography.cardTitle,
    marginBottom: Spacing.p4,
  },
  descriptionWrapper: {
  },
  description: {
    ...Typography.description,
    ...Colors.textLight,
  },
  countWrapper: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
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
