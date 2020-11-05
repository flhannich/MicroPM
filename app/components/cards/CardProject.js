import React, { useState, useEffect } from 'react'
import { TouchableHighlight, Text, View, StyleSheet } from 'react-native'

import { format } from "date-fns";
import { de } from 'date-fns/locale'
import { parseISO } from 'date-fns/parseISO'

import { Colors, Typography, Spacing, Forms, Cards, Files, Buttons } from './../../styles'
import { Counter } from './../../components'

const CardProject = ({item, navigation}) => {

const hasReviews = item.tasks.filter(item => item.is_review.indexOf('1') !== -1);
const [progress, setProgress] = useState(null)


useEffect(() => {
  let completed = null;
  let total = null;

  item.tasks.forEach((item, i) => {
    if(item.weight !== null && item.status === 'completed') {
      completed += parseInt(item.weight);
    }
    if(item.weight !== null) {
      total += parseInt(item.weight);
    }
  });

  let res = Math.round(completed / total * 100);

  setProgress(res);


  // <View style={styles.progressBarWrapper}>
  //   <View style={styles.progressBarBackground}></View>
  //   <View style={[styles.progressBarActive, progressWidth]}></View>
  // </View>


}, [])


const progressWidth = { width: progress + '%' };

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
                <Counter status={'review'} count={hasReviews.length} />
              }
              {item.tasks.length > 0 &&
                <Counter status={'task'} count={item.tasks.length} />
              }
            </View>
          </View>
          <View style={styles.meta}>
            <Text style={styles.info}>Last Update: {format(new Date(Date.parse(item.updated_at)), 'd MMM', { locale: de })}</Text>
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
