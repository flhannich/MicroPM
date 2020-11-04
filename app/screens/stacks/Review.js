
import React, { useState, useEffect, useContext } from 'react'
import { TextInput, Text, ScrollView, View, StyleSheet } from 'react-native'

import { Colors, Typography, Spacing, Forms, Cards, Files, Buttons } from './../../styles'

import { FileImage, FileLink, FilePDF, ButtonPrimary, ButtonSecondary, Badge } from './../../components'

import { Ionicons } from '@expo/vector-icons';

import { ReviewContext } from './../../context/ReviewContext'

import { format } from "date-fns"
import { de } from 'date-fns/locale'
import formatDistance from 'date-fns/formatDistance'

export default function Review( data ) {

  const navigation = data.navigation;

  const { reviews } = useContext(ReviewContext);

  console.log(reviews);

  const elapsedTime = (time) => {
    return formatDistance( new Date(Date.parse(time)), new Date(), { addSuffix: true, locale: de });
  }
  //
  // const pdf = data.file.filter(item => item.type === 'pdf');
  const images = (
    '432'

  )


  console.log(images)
  // const link = data.file.filter(item => item.type === 'link');
  //
  // let projectName;
  //
  // (data.project !== undefined)
  // ? projectName = data.project.name
  // : projectName = false;
  //
  // console.log(projectName);

  return (
    <>

        <ScrollView
          horizontal={true}
          style={styles.container}
        >
          { reviews.map((item, index) =>
            <View
              style={styles.reviewWrapper}
              key={index}
            >

              <Text style={styles.mainTitle}>{item.name}</Text>

              <View style={styles.meta}>
                <Badge status={item.status}/>
                <Text style={styles.date}>{elapsedTime(item.updated_at)}</Text>
              </View>

              <View style={styles.files}>
              {item.file.map((file, index) =>
                <>
                  {file.type === 'document' &&
                    <FilePDF item={file} />
                  }
                  {file.type === 'image' &&
                    <FileImage item={file} />
                  }
                  {file.type === 'link' &&
                    <FileLink item={file} />
                  }
                </>
              )}
              </View>

              <Text style={styles.description}>{item.description}</Text>

            </View>
          )}
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

    </>
  )

}


const styles = StyleSheet.create({
  container: {
    ...Spacing.container,
    flex: 1,
  },
  reviewWrapper: {
    marginRight: Spacing.p4,
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: Spacing.p2,
    backgroundColor: '#fff',
  },
  mainTitle: {
    ...Typography.mainTitle,
    marginBottom: Spacing.p4,
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
    ...Colors.textBrand,
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
