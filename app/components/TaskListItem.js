import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

import { format } from "date-fns";
import { de } from 'date-fns/locale'
import { parseISO } from 'date-fns/parseISO'

import { Ionicons } from '@expo/vector-icons';

import { Colors, Typography, Spacing, Forms, Cards, Files, Buttons } from './../styles'

import { FilePreview } from './'

const TaskListItem = ({item}) => {

  return (
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
  )
}

export default TaskListItem;



const styles = StyleSheet.create({
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
