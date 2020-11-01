
import React, { useState, useEffect, useContext } from 'react'
import { ActivityIndicator, FlatList, Button, Text, View, StyleSheet, ScrollView } from 'react-native'

import { Colors, Typography, Spacing, Forms, Cards, Files, Buttons } from './../styles'

import { TaskListItem } from './../components'

import { AuthContext } from '../context/AuthContext.js'

export default function Task(projects) {

  const { id } = useContext(AuthContext);

  const tasks = projects.route.params.item.tasks;

  const tasksReview = tasks.filter(task => task.status == 'review');
  const tasksCompleted = tasks.filter(task => task.status == 'completed');
  const tasksInProgress = tasks.filter(task => task.status == 'in_progress');

  return (

    <ScrollView style={styles.container}>

      {tasksReview.map((item, index) => (
        <TaskListItem
          item={item}
          key={'key' + index}
        />
      ))}

      <View style={styles.cardTitle}>
        <Text style={styles.status}>In Progress </Text>
      </View>

      {tasksInProgress.map((item, index) => (
        <TaskListItem
          item={item}
          key={'key' + index}
        />
      ))}

      <View style={styles.cardTitle}>
        <Text style={styles.status}>Completed</Text>
        <Text style={styles.date}>{tasksCompleted.length} Tasks</Text>
      </View>

      {tasksCompleted.map((item, index) => (
        <TaskListItem
          item={item}
          key={'key' + index}
        />
      ))}

    </ScrollView>

  )

}


const styles = StyleSheet.create({
  container: {
    ...Spacing.container,
    flex: 1,
  },
  cardTitle: {
    ...Cards.cardTitle,
    marginTop: Spacing.p5,
    marginBottom: Spacing.p3,
  },
  date: {
    ...Typography.label,
    ...Colors.textLightest,
    marginLeft: Spacing.p1,
  },
  datePreview: {
    ...Typography.label,
    ...Colors.textWhiteLight,
    marginLeft: Spacing.p2,
  },
  status: {
    ...Forms.label,
    ...Typography.status,
    ...Colors.textLightest,
  },
})
