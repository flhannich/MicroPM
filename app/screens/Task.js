
import React, { useState, useEffect, useContext } from 'react'
import { ActivityIndicator, FlatList, Button, Text, View, StyleSheet, ScrollView } from 'react-native'

import { format } from "date-fns";
import { de } from 'date-fns/locale'
import { parseISO } from 'date-fns/parseISO'


import { Colors, Typography, Spacing, Forms, Cards } from './../styles'

import { AppContext } from '../context/AppContext.js'

export default function Task(project) {
  console.log(project.route.params.item.task);

  const { id } = useContext(AppContext);


  const Item = ({ item }) => (
    <>
      {item.status == 'review' &&
        <View style={styles.cardReview}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.info}>{format(new Date(Date.parse(item.created_at)), 'd. MMM', { locale: de })}</Text>
        </View>
      }
      {item.status == 'in_progress' &&
        <View style={styles.card}>
          <Text style={styles.title}>{item.name}</Text>
        </View>
      }
      {item.status == 'completed' &&
        <View style={styles.card}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.info}>{format(new Date(Date.parse(item.updated_at)), 'd. MMM', { locale: de })}</Text>
        </View>
      }
    </>
  );

  const renderItem = ({ item }) => (
      <Item item={item} />
  );

  const tasks = project.route.params.item.task;

  const tasksReview = tasks.filter(task => task.status == 'review');
  const tasksCompleted = tasks.filter(task => task.status == 'completed');
  const tasksInProgress = tasks.filter(task => task.status == 'in_progress');
  return(

    <ScrollView style={styles.container}>

      {tasksReview.map((item, index) => (
        <Item
          item={item}
          key={'key' + index}
        />
      ))}

      <Text style={styles.status}>In Progress</Text>

      {tasksInProgress.map((item, index) => (
        <Item
          item={item}
          key={'key' + index}
        />
      ))}

      <Text style={styles.status}>Completed</Text>

      {tasksCompleted.map((item, index) => (
        <Item
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

  container: {
    ...Spacing.container,
    flex: 1,
  },
  card: {
    ...Cards.card,
    marginBottom: Spacing.p3,
  },
  cardReview: {
    ...Cards.cardReview,
    marginBottom: Spacing.p3,
  },
  client: {
    ...Typography.label,
    marginBottom: Spacing.p4,
  },
  title: {
    ...Typography.title,
    marginBottom: Spacing.p2,
  },
  description: {
    ...Typography.description,
    ...Colors.textLight,
    marginBottom: Spacing.p2,
    marginBottom: Spacing.p3,
  },
  info: {
    ...Typography.label,
    ...Colors.textLight,
  },
  status: {
    ...Forms.label,
    ...Typography.status,
    ...Colors.textLightest,
    marginTop: Spacing.p2,
    marginBottom: Spacing.p3,
  },
})
