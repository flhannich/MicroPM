
import React, { useState, useEffect, useContext } from 'react'
import { ActivityIndicator, FlatList, Button, Text, View, StyleSheet, ScrollView } from 'react-native'

import { format } from "date-fns";
import { de } from 'date-fns/locale'
import { parseISO } from 'date-fns/parseISO'

import { Colors, Typography, Spacing, Forms, Cards, Files, Buttons } from './../styles'

import { FilePreview } from './../components'

import { AppContext } from '../context/AppContext.js'

export default function Task(projects) {

  console.log(projects.route.params.item.tasks);

  const { id } = useContext(AppContext);


  const Item = ({ item }) => (
    <>
      {item.status == 'review' &&
        <View style={styles.cardPreview}>
          <Text style={styles.titlePreview}>{item.name}</Text>
            <View style={styles.files}>
              {item.files.length > 0 && item.files.map((item, index) => (
                <FilePreview
                  key={index}
                  item={item}
                />
              ))}
              <Text style={styles.datePreview}>{format(new Date(Date.parse(item.updated_at)), 'd MMM yyyy', { locale: de })}</Text>
            </View>
        </View>
      }
      {item.status == 'in_progress' &&
        <View style={styles.card}>
          <Text style={styles.title}>{item.name}</Text>
            <View style={styles.files}>
              {item.files.length > 0 && item.files.map((item, index) => (
                <FilePreview
                  key={index}
                  item={item}
                />
              ))}
            </View>
        </View>
      }
      {item.status == 'completed' &&
        <View style={styles.cardCompleted}>
          <Text style={styles.title}>{item.name}</Text>
            <View style={styles.files}>
              {item.files.length > 0 && item.files.map((item, index) => (
                <FilePreview
                  key={index}
                  item={item}
                />
              ))}
              <Text style={styles.date}>{format(new Date(Date.parse(item.updated_at)), 'd MMM yyyy', { locale: de })}</Text>
            </View>
        </View>
      }
    </>
  );

  const renderItem = ({ item }) => (
      <Item item={item} />
  );

  const tasks = projects.route.params.item.tasks;

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


      <View style={styles.cardTitle}>
        <Text style={styles.status}>In Progress </Text>
      </View>

      {tasksInProgress.map((item, index) => (
        <Item
          item={item}
          key={'key' + index}
        />
      ))}


      <View style={styles.cardTitle}>
        <Text style={styles.status}>Completed</Text>
        <Text style={styles.date}>{tasksCompleted.length} Tasks</Text>
      </View>

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
  card: {
    ...Cards.card,
  },
  cardCompleted: {
    ...Cards.cardCompleted,
  },
  cardPreview: {
    ...Cards.cardReview,
    marginBottom: Spacing.p2,
  },
  cardTitle: {
    ...Cards.cardTitle,
    marginTop: Spacing.p5,
    marginBottom: Spacing.p3,
  },
  files: {
    ...Files.container,
    marginTop: Spacing.p2,
  },
  client: {
    ...Typography.label,
    marginBottom: Spacing.p4,
  },
  title: {
    ...Typography.title,
  },
  titlePreview: {
    ...Typography.title,
    ...Colors.textWhiteFull,
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
