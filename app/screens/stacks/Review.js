
import React, { useState, useEffect, useContext } from 'react'
import { TextInput, Text, ScrollView, View, StyleSheet } from 'react-native'

import { Colors, Typography, Spacing, Forms, Cards, Files, Buttons } from './../../styles'

import { FileImage, FileLink, FilePDF, ButtonPrimary, ButtonSecondary } from './../../components'

import { Ionicons } from '@expo/vector-icons';

import { format } from "date-fns"
import { de } from 'date-fns/locale'
import formatDistance from 'date-fns/formatDistance'

export default function Review( item ) {

  const data = item.route.params.item;
  const navigation = item.navigation;

  const elapsedTime = (time) => {
    return formatDistance( new Date(Date.parse(time)), new Date(), { addSuffix: true, locale: de });
  }

  const pdf = data.file.filter(item => item.type === 'pdf');
  const images = data.file.filter(item => item.type === 'jpg');
  const link = data.file.filter(item => item.type === 'link');

  let projectName;

  (data.project !== undefined)
  ? projectName = data.project.name
  : projectName = false;

  console.log(projectName);

  return (
    <>
    <View style={{flex: 1}}>
    <ScrollView style={styles.container}>

      <View style={styles.meta}>
        <Text style={styles.badgeReview} numberOfLines={1}>Review</Text>
        <Text style={styles.date}>{elapsedTime(data.updated_at)}</Text>
      </View>

        <View style={styles.files}>
          {pdf.length > 0 &&
            <FilePDF item={pdf} />
          }
          {images.length > 0 &&
            <FileImage item={images} />
          }
          {link.length > 0 &&
            <FileLink item={link} />
          }
        </View>
        <Text style={styles.description}>{data.description}</Text>

    </ScrollView>

    <View style={styles.footer}>
      <ButtonSecondary
        target={() => navigation.goBack() }
        text='Add a note'
      />
      <ButtonSecondary
        target={() => navigation.goBack() }
        text='Accept'
      />
    </View>

  </View>
    </>
  )

}


const styles = StyleSheet.create({
  container: {
    ...Spacing.container,
    flex: 1,
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: Spacing.p2,
    backgroundColor: '#fff',
  },
  counter: {
    ...Typography.info,
    ...Colors.textLightest,
    marginLeft: Spacing.p1,
  },
  title: {
    ...Typography.title,
    marginBottom: Spacing.p2,
  },
  meta: {
    display: 'flex',
    flexDirection:"row",
    alignItems: 'center',
    marginBottom: Spacing.p3,
    paddingBottom: Spacing.p3,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  buttonSpacing: {
    paddingBottom: Spacing.p2
  },
  titleAttachment: {
    display: 'flex',
    flexDirection:"row",
    alignItems: 'center',
    marginBottom: Spacing.p4,
  },
  iconAttachment: {
    marginRight: Spacing.p2,
  },
  badgeReview: {
    ...Typography.badge,
    ...Colors.textWhiteFull,
    ...Buttons.badgeReview,
  },
  description: {
    ...Typography.description,
  },
  status: {
    ...Forms.label,
    ...Typography.status,
    ...Colors.textLightest,
    marginBottom: Spacing.p3,
  },
  statusColor: {
    ...Forms.label,
    ...Typography.status,
    ...Colors.textBrand,
  },
  date: {
    ...Typography.date,
    ...Colors.textLight,
    marginLeft: Spacing.p2,
  },
  info: {
    ...Typography.info,
    ...Colors.textLightest,
    textAlign: 'center',
    marginTop: Spacing.p2,
  },
  input: {
    ...Forms.input,
    ...Typography.input,
    marginTop: Spacing.p2,
    marginBottom: Spacing.p3,
  },
})
