
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

  // <View style={{marginBottom: Spacing.p2}}>
  //   <Text style={styles.title}>{title}</Text>
  // </View>
  //
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
              <Text style={[styles.author, item.user.name === username && styles.authorUser]}>{item.user.name}</Text>
              <Text style={[styles.date, item.user.name === username && styles.dateUser]}>{_elapsedTime(item.updated_at)}</Text>
            </View>
            <View style={styles.bodyWrapper}>
              <Text style={[styles.body, item.user.name === username && styles.bodyUser]}>{item.message}</Text>
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
    marginBottom: Spacing.p3,
    // borderWidth: 1,
    // borderColor: Colors.borderLight,
    // paddingBottom: Spacing.p3,
    marginBottom: Spacing.p3,
    paddingVertical: 12,
    paddingHorizontal: 16,
    // backgroundColor: '#f5f5f5',
    width: '90%',
  },
  messageUser: {
    alignSelf: 'flex-end',
    width: '90%',
    borderWidth: 0,
    // paddingHorizontal: Spacing.p3,
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
    // justifyContent: 'space-between',
    paddingBottom: Spacing.p1,
  },
  body: {
    ...Typography.body,
    ...Colors.textNormal,
  },
  bodyUser: {
    // ...Colors.textWhiteFull,
    ...Colors.textNormal,
  },
  author: {
    ...Typography.author,
    ...Colors.textBrand,
    ...Colors.textNormal,
    marginRight: Spacing.p2,
  },
  authorUser: {
    ...Colors.textNormal,
    // ...Colors.textWhiteFull,
  },
  date: {
    ...Typography.description,
    ...Colors.textLightest,
  },
  dateUser: {
    // ...Colors.textWhiteLight,
    ...Colors.textLightest,
  },
})
