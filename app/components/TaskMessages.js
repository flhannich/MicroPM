
import React, {useEffect, useState, useContext} from 'react'

import { Text, View, StyleSheet, TextInput } from 'react-native'
import { Colors, Typography, Spacing, Forms } from './../styles'
import { Ionicons } from '@expo/vector-icons';

import { ButtonPrimary } from './'

import { format } from "date-fns"
import { de } from 'date-fns/locale'
import formatDistance from 'date-fns/formatDistance'

import { AuthContext } from './../context/AuthContext'

const TaskMessages = ( { title, messages } ) => {

  const _elapsedTime = (time) => {
    return formatDistance( new Date(Date.parse(time)), new Date(), { addSuffix: true, locale: de })
  }

  const { username } = useContext(AuthContext);

  return (

    <View style={styles.messageWrapper}>

      <View style={{marginBottom: Spacing.p2}}>
        <Text style={styles.title}>{title}</Text>
      </View>

        {messages.map((item,index) =>

          <View
            key={index}
            style={[styles.message, item.user.name === username && styles.messageUser]}
          >
            <View style={styles.authorWrapper}>
              {item.user.name !== username &&
                <Text style={styles.author}>{item.user.name}</Text>
              }
            </View>
            <View style={styles.bodyWrapper}>
              <Text style={[styles.body, item.user.name === username && styles.bodyUser]}>{item.message}</Text>
            </View>
            <View style={styles.infoWrapper}>
              <Text style={[styles.date, item.user.name === username && styles.dateUser]}>{_elapsedTime(item.updated_at)}</Text>
            </View>
          </View>

        )}

      </View>




  )

}

export default TaskMessages

const styles = StyleSheet.create({
  messageWrapper: {
    display: 'flex',
  },
  title: {
    ...Typography.subTitle,
    ...Colors.textLightest,
  },
  message: {
    borderRadius: 5,
    backgroundColor: '#f5f5f5',
    width: '85%',
    marginBottom: Spacing.p3,
    paddingHorizontal: Spacing.p3,
    paddingVertical: Spacing.p2,
  },
  messageUser: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.brand100,
  },
  bodyWrapper: {
    paddingBottom: Spacing.p1,
  },
  infoWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  authorWrapper: {
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: Spacing.p1,
  },
  body: {
    ...Typography.description,
    ...Colors.textNormal,
  },
  bodyUser: {
    ...Colors.textWhiteFull,
    ...Colors.textNormal,
  },
  author: {
    ...Typography.description,
    ...Colors.textDark,
  },
  date: {
    ...Typography.description,
    ...Colors.textLight,
  },
  dateUser: {
    ...Colors.textWhiteLight,
    ...Colors.textLight,
  },
})
